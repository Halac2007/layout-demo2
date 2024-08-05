document.addEventListener('DOMContentLoaded', () => {
  let lastScrollTop = 0
  let startScrollTop = 0

  // Xác định vị trí bắt đầu của phần tử khi trang được tải
  function setStartScrollTop() {
    const image = document.getElementById('background-image-sticky')
    if (image) {
      const rect = image.getBoundingClientRect()
      startScrollTop = window.scrollY + rect.top
    }
  }

  // Cập nhật opacity của overlay khi cuộn trang
  function updateOverlayOpacity(scrollTop) {
    const overlay = document.querySelector('.overlay')
    if (!overlay) return

    const opacity =
      scrollTop > lastScrollTop
        ? 1
        : Math.max(0, (scrollTop - startScrollTop) / (document.documentElement.scrollHeight - window.innerHeight))
    overlay.style.opacity = opacity

    lastScrollTop = scrollTop
  }

  // Cập nhật hình ảnh và caption khi cuộn trang
  function updateImageAndCaption(scrollTop) {
    const image = document.getElementById('background-image-sticky')
    const caption = document.getElementById('image-caption')

    if (!image || !caption) return

    const adjustedScrollTop = scrollTop - startScrollTop

    if (adjustedScrollTop >= 700) {
      image.src = 'https://image.plo.vn/w2000/Uploaded/2024/bpcbzqvp/2024_08_02/du-lich-ben-vung-1-7235.jpg.webp'
      caption.textContent = 'Thủ tướng Phạm Minh Chính...'
    } else if (adjustedScrollTop >= 500) {
      image.src = 'https://image.plo.vn/w2000/Uploaded/2024/fcivpwib/2024_07_30/h2-2518.jpg.webp'
      caption.textContent = 'Caption for image 2'
    } else if (adjustedScrollTop >= 200) {
      image.src = 'https://image.plo.vn/w2000/Uploaded/2024/bpcbzqvp/2024_08_02/du-lich-ben-vung-3-758.jpg.webp'
      caption.textContent = 'Caption for image 1'
    } else {
      image.src = 'https://image.plo.vn/w2000/Uploaded/2024/fcivpwib/2024_07_30/cong-vien-du-lich-yang-bay-6221.jpg.webp'
      caption.textContent = 'Default caption text'
    }
  }

  // Cập nhật vị trí của phần tử khi trang được tải và khi kích thước cửa sổ thay đổi
  function adjustStickyPosition() {
    const contentLeft = document.getElementById('right-content')
    if (contentLeft) {
      contentLeft.style.top = `calc(50% - ${contentLeft.clientHeight / 2}px)`
    }
  }

  // Lắng nghe sự kiện cuộn và thực hiện các cập nhật
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || window.pageYOffset
    requestAnimationFrame(() => {
      updateOverlayOpacity(scrollTop)
      updateImageAndCaption(scrollTop)
    })
  })

  window.addEventListener('load', () => {
    setStartScrollTop()
    adjustStickyPosition()
  })

  window.addEventListener('resize', adjustStickyPosition)
})
