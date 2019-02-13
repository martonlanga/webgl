function main() {
  const canvas = document.querySelector('#glCanvas')

  // init the GL context
  const gl = canvas.getContext('webgl')

  // only cont. if webgl
  if (!gl) {
    alert('no supp 4 u sry thx bye')
    return
  }

  // set clear color to black, full opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  // clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT)
}

main()
