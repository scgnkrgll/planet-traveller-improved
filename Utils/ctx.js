let canvas = document.querySelector("canvas")
let canvasWidth = canvas.width = window.innerWidth
let canvasHeight = canvas.height = window.innerHeight
let ctx = canvas.getContext("2d")

export { ctx, canvasWidth, canvasHeight }