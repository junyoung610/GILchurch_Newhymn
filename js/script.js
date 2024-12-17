document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    header: document.getElementById("header"),
    listH1: document.getElementById("list-h1"),
    listView: document.getElementById("list-view"),
    contentView: document.getElementById("content-view"),
    sectionMain: document.getElementById("section-main"),
    bookList: document.getElementById("book-list"),
    searchInput: document.getElementById("search-input"),
    searchButton: document.getElementById("search-button"),
    backToListButton: document.getElementById("back-to-list"),
    backToListButton2: document.getElementById("sub-list"),
    sectionTitle: document.getElementById("section-title"),
    sectionContent: document.getElementById("section-content"),
    sectionImage: document.getElementById("section-image"),
    prevButton: document.getElementById("prev-button"),
    nextButton: document.getElementById("next-button"),
    making: document.getElementById("making"),
    mainMaking: document.getElementById("main-making"),
    modal: document.getElementById("imageModal"),
    expandedImage: document.getElementById("expandedImage"),
  };

  let data = [];
  let currentIndex = -1;

  // 초기 데이터 로드
  async function loadData() {
    try {
      const response = await fetch("Newhymndata.json");
      data = await response.json();
      renderList(data);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  }

  // 목록 렌더링
  function renderList(items) {
    elements.bookList.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = item.title;
      link.dataset.id = item.id;

      link.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(item.id);
      });

      li.appendChild(link);
      elements.bookList.appendChild(li);
    });
  }

  // 검색 기능
  function performSearch() {
    const query = elements.searchInput.value.toLowerCase().trim();
    const filteredData = data.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
    );
    renderList(filteredData);
  }

  elements.searchButton.addEventListener("click", performSearch);
  elements.searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") performSearch();
  });

  // 섹션 보기
  function showSection(id) {
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return;

    currentIndex = index;
    const item = data[index];
    elements.sectionTitle.textContent = item.title;
    elements.sectionContent.textContent = item.content;
    elements.sectionImage.src = item.image;

    toggleView(false);
    updateNavButtons();
  }

  // 목록 및 섹션 전환
  function toggleView(showList) {
    const displayList = showList ? "flex" : "none";
    const displaySection = showList ? "none" : "block";

    elements.listH1.style.display = showList ? "block" : "none";
    elements.listView.style.display = displayList;
    elements.sectionMain.style.display = displaySection;
    elements.bookList.style.display = displayList;
    elements.contentView.style.display = displaySection;
    elements.backToListButton.style.display = showList
      ? "none"
      : "inline-block";
    elements.header.style.display = showList ? "block" : "none";
    elements.making.style.display = "flex";
    elements.mainMaking.style.display = showList ? "flex" : "none";

    // 검색창 초기화 및 600px 이하 검색 input 숨김
    if (showList) {
      elements.searchInput.value = "";
      renderList(data);
      if (window.innerWidth <= 600) {
        elements.searchInput.style.display = "none";
      }
    }
  }

  // 이전/다음 버튼 상태 업데이트
  function updateNavButtons() {
    elements.prevButton.disabled = currentIndex === 0;
    elements.nextButton.disabled = currentIndex === data.length - 1;
  }

  // 목록으로 돌아가기
  function backToList() {
    toggleView(true);
  }

  elements.backToListButton.addEventListener("click", backToList);
  elements.backToListButton2.addEventListener("click", backToList);

  // 이전/다음 버튼 동작
  elements.prevButton.addEventListener("click", () => {
    if (currentIndex > 0) showSection(data[currentIndex - 1].id);
  });
  elements.nextButton.addEventListener("click", () => {
    if (currentIndex < data.length - 1) showSection(data[currentIndex + 1].id);
  });

  // 이미지 모달
  elements.sectionImage.addEventListener("click", () =>
    openModal(elements.sectionImage.src)
  );

  function openModal(imgSrc) {
    elements.expandedImage.src = imgSrc;
    elements.modal.style.display = "flex";
  }

  window.closeModal = function () {
    elements.modal.style.display = "none";
  };

  // 600px 이하 검색창 toggle
  elements.searchButton.addEventListener("click", () => {
    if (window.innerWidth <= 600) {
      elements.searchInput.style.display =
        elements.searchInput.style.display === "none" ||
        elements.searchInput.style.display === ""
          ? "inline-block"
          : "none";
    }
  });

  loadData();
});
