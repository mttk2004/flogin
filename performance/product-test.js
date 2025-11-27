import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// Custom trend metrics
const getProductsTime = new Trend('get_products_response_time');
const createProductTime = new Trend('create_product_response_time');

// A valid JWT token is required for these endpoints.
// In a real scenario, this would be acquired from the login endpoint.
// For this test, we will use a placeholder. The backend security needs to be
// temporarily disabled or configured to accept this token for the test to run.
const FAKE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyMTIzIn0.mockSignature';

export const options = {
  thresholds: {
    'http_req_failed': ['rate<0.02'], // Allow a slightly higher error rate for more complex operations
    'http_req_duration': ['p(95)<1000'], // 95% of requests should be below 1s
    'get_products_response_time': ['p(95)<800'],
    'create_product_response_time': ['p(95)<1200'],
  },
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 200 },
    { duration: '1m', target: 200 },
    { duration: '30s', target: 500 },
    { duration: '1m', target: 500 },
    { duration: '2m', target: 800 }, // Stress phase
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${FAKE_JWT}`,
    },
  };

  // Randomly choose between getting all products and creating one
  // to simulate a more realistic user behavior mix.
  if (Math.random() < 0.8) { 
    // 80% of the time, users are browsing
    const getRes = http.get('http://localhost:8080/api/products?page=0&size=20', params);
    getProductsTime.add(getRes.timings.duration);
    check(getRes, {
      'GET products successful (status 200)': (r) => r.status === 200,
    });
  } else {
    // 20% of the time, users are creating products
    const productName = `k6-product-${__VU}-${__ITER}`; // Unique name for each iteration
    const payload = JSON.stringify({
      name: productName,
      price: 19.99,
      quantity: 100,
      category: 'Electronics',
      description: 'Created by k6 test',
    });

    const createRes = http.post('http://localhost:8080/api/products', payload, params);
    createProductTime.add(createRes.timings.duration);
    check(createRes, {
      'CREATE product successful (status 201)': (r) => r.status === 201,
    });
  }

  sleep(1);
}
