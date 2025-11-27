import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

// Custom trend metric for response time
const loginResponseTime = new Trend('login_response_time');

export const options = {
  // Define thresholds for success criteria
  thresholds: {
    'http_req_failed': ['rate<0.01'], // http errors should be less than 1%
    'http_req_duration': ['p(95)<800'], // 95% of requests should be below 800ms
    'login_response_time': ['p(95)<800'], // 95% of login requests should be below 800ms
  },
  // Define stages for load and stress testing
  stages: [
    // --- Load Testing Phase ---
    { duration: '30s', target: 100 },  // 1. Ramp-up to 100 users
    { duration: '1m', target: 100 },   // 2. Stay at 100 users
    { duration: '30s', target: 500 },  // 3. Ramp-up to 500 users
    { duration: '1m', target: 500 },   // 4. Stay at 500 users
    { duration: '30s', target: 1000 }, // 5. Ramp-up to 1000 users
    { duration: '1m', target: 1000 },  // 6. Stay at 1000 users
    
    // --- Stress Testing Phase ---
    { duration: '1m', target: 1500 }, // 7. Ramp-up to 1500 users to find breaking point
    { duration: '2m', target: 1500 }, // Stay to observe behavior under stress
    
    // --- Ramp-down Phase ---
    { duration: '30s', target: 0 },    // 8. Scale down
  ],
};

export default function () {
  const url = 'http://localhost:8080/api/auth/login';
  const payload = JSON.stringify({
    // Using the valid credentials from AuthService
    username: 'testuser123',
    password: 'Pass123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Send POST request
  const res = http.post(url, payload, params);

  // Add response time to our custom metric
  loginResponseTime.add(res.timings.duration);

  // Check for successful response
  check(res, {
    'login successful (status 200)': (r) => r.status === 200,
    'response contains token': (r) => r.json('token') !== null,
  });

  // Add a short sleep to simulate user think time
  sleep(1);
}
