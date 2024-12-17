// 버튼과 body 요소 가져오기
const toggleButton = document.getElementById("mode-toggle");
const body = document.body;
const icon = toggleButton.querySelector("i");

// 로컬 스토리지에서 이전 테마 저장 여부 확인
const currentMode = localStorage.getItem("mode");
if (currentMode === "dark") {
  body.classList.add("dark-mode");
  icon.classList.remove("ri-sun-fill");
  icon.classList.add("ri-moon-fill"); // 달 아이콘으로 변경
}

// 버튼 클릭 시 모드 변경
toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    icon.classList.remove("ri-sun-fill");
    icon.classList.add("ri-moon-fill"); // 다크 모드일 때 달 아이콘 표시
    localStorage.setItem("mode", "dark");
  } else {
    icon.classList.remove("ri-moon-fill");
    icon.classList.add("ri-sun-fill"); // 화이트 모드일 때 태양 아이콘 표시
    localStorage.setItem("mode", "light");
  }
});
