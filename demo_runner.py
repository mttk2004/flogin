import subprocess
import os
import sys
import time

# Cấu hình màu sắc cho terminal
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def clear_screen():
    """Xóa màn hình terminal"""
    os.system('cls' if os.name == 'nt' else 'clear')

def print_header(msg):
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*60}")
    print(f" {msg}")
    print(f"{Colors.ENDC}{'='*60}{Colors.ENDC}")

def print_step(msg):
    print(f"\n{Colors.BLUE}➜ {msg}{Colors.ENDC}")

def run_command(command, cwd):
    """Chạy lệnh shell tại thư mục chỉ định"""
    print(f"{Colors.WARNING}Executing: {command} (in ./{cwd}){Colors.ENDC}")
    try:
        result = subprocess.run(command, cwd=cwd, shell=True)
        if result.returncode != 0:
            print(f"{Colors.FAIL}❌ Command failed!{Colors.ENDC}")
            return False
        return True
    except Exception as e:
        print(f"{Colors.FAIL}Error: {e}{Colors.ENDC}")
        return False

def wait_for_user():
    input(f"\n{Colors.GREEN}Press Enter to continue...{Colors.ENDC}")

# Định nghĩa các kịch bản demo
SCENARIOS = {
    "1": {
        "title": "Câu 2: Unit Testing (Frontend & Backend)",
        "steps": [
            ("Frontend: Login Unit Tests", "frontend", "npx vitest run src/tests/loginValidation.test.ts"),
            ("Backend: Login Unit Tests", "backend", "mvn test -Dtest=AuthServiceTest"),
            ("Frontend: Product Unit Tests", "frontend", "npx vitest run src/tests/productValidation.test.ts"),
            ("Backend: Product Unit Tests", "backend", "mvn test -Dtest=ProductServiceTest"),
        ]
    },
    "2": {
        "title": "Câu 3: Integration Testing",
        "steps": [
            ("Frontend: Login Integration", "frontend", "npx vitest run src/tests/Login.integration.test.tsx"),
            ("Backend: Login Integration API", "backend", "mvn test -Dtest=AuthControllerIntegrationTest"),
            ("Frontend: Product Integration", "frontend", "npx vitest run src/tests/ProductList.integration.test.tsx src/tests/ProductDetail.integration.test.tsx src/tests/ProductForm.integration.test.tsx"),
            ("Backend: Product Integration API", "backend", "mvn test -Dtest=ProductControllerIntegrationTest"),
        ]
    },
    "3": {
        "title": "Câu 4: Mock Testing",
        "steps": [
            ("Frontend: Login Mock Tests", "frontend", "npx vitest run src/tests/Login.mock.test.tsx"),
            ("Backend: Login Mock Tests", "backend", "mvn test -Dtest=AuthServiceMockTest"),
            ("Frontend: Product Mock Tests", "frontend", "npx vitest run src/tests/Product.mock.test.tsx"),
            ("Backend: Product Mock Tests", "backend", "mvn test -Dtest=ProductServiceMockTest"),
        ]
    },
    "4": {
        "title": "Câu 5: E2E Automation Testing (Cypress)",
        "note": "⚠️  LƯU Ý: Cần bật Frontend Server (npm run dev) ở terminal khác trước khi chạy!",
        "steps": [
            ("Login E2E Flow", "frontend", "npx cypress run --spec \"cypress/e2e/login.cy.ts\""),
            ("Product E2E Flow", "frontend", "npx cypress run --spec \"cypress/e2e/product.cy.ts\""),
        ]
    },
    "5": {
        "title": "Phần Mở Rộng: Performance Testing (k6)",
        "note": "⚠️  LƯU Ý: Cần bật Backend Server (mvn spring-boot:run) ở terminal khác trước khi chạy!",
        "steps": [
            ("Login Load Test", "root", "k6 run performance/login-test.js"),
        ]
    }
}

def run_scenario(key):
    scenario = SCENARIOS[key]
    # Clear screen trước khi bắt đầu chạy scenario để giảng viên tập trung
    clear_screen()
    print_header(scenario["title"])
    
    if "note" in scenario:
        print(f"{Colors.WARNING}{scenario['note']}{Colors.ENDC}")
        input(f"{Colors.BLUE}Nhấn Enter nếu bạn đã sẵn sàng...{Colors.ENDC}")

    for desc, cwd, cmd in scenario["steps"]:
        print_step(desc)
        working_dir = "." if cwd == "root" else cwd
        
        success = run_command(cmd, working_dir)
        if not success:
            choice = input(f"{Colors.FAIL}Test failed. Continue anyway? (y/n): {Colors.ENDC}")
            if choice.lower() != 'y':
                break
    
    print(f"\n{Colors.GREEN}✅ Completed: {scenario['title']}{Colors.ENDC}")
    wait_for_user()

def main():
    while True:
        clear_screen()
        
        print_header("FLOGIN DEMO AUTOMATION TOOL")
        print(f"{Colors.BOLD}Chọn kịch bản để chạy:{Colors.ENDC}")
        print("1. Unit Testing (Login + Product)")
        print("2. Integration Testing (Login + Product)")
        print("3. Mock Testing (Login + Product)")
        print("4. E2E Automation (Cypress)")
        print("5. Performance Testing (k6)")
        print("0. Thoát")
        print("-" * 30)
        
        choice = input(f"{Colors.BLUE}Nhập lựa chọn (0-5): {Colors.ENDC}")
        
        if choice == "0":
            print("Goodbye!")
            sys.exit()
        elif choice in SCENARIOS:
            run_scenario(choice)
        else:
            print(f"{Colors.FAIL}Lựa chọn không hợp lệ!{Colors.ENDC}")
            time.sleep(1)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nĐã dừng chương trình.")
        sys.exit()