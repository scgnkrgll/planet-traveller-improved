const canvas = document.querySelector("canvas")
const canvasWidth = canvas.width = window.innerWidth
const canvasHeight = canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")

export { ctx, canvasWidth, canvasHeight }