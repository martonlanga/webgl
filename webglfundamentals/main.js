function init() {
  const canvas = document.querySelector('canvas')

  const gl = canvas.getContext('webgl')
  if (!gl) {
    console.log('webgl not supported')
    return
  }

  function createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (!success) {
      console.log(gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
    }

    return shader
  }

  function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    const success = gl.getProgramParameter(program, gl.LINK_STATUS)

    if (!success) {
      console.log("couldn't create program")
      return
    }

    return program
  }

  // get not js source text
  const vertexShaderSource = document.getElementById('2d-vertex-shader').text
  const fragmentShaderSource = document.getElementById('2d-fragment-shader')
    .text

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  )
  // link these 2 into program
  const program = createProgram(gl, vertexShader, fragmentShader)

  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
  const positionBuffer = gl.createBuffer()

  // global bind point
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  // three 2d points
  const positions = [0, 0, 0, 0.5, 0.7, 0]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  // tells -1 - +1 renders from 0 - canvas.width & height
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  // clear the canvas
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  // tell it to use our program (pair of shaders)
  gl.useProgram(program)

  // turn attribute on
  gl.enableVertexAttribArray(positionAttributeLocation)

  // bind the position buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  // tell the attribute how to get data out of the positionBuffer (ARRAY_BUFFER)
  const size = 2 // 2 components per iteration
  const type = gl.FLOAT // the data is 32bit floats
  const normalize = false // don't normalize the data
  const stride = 0 // 0 = move forward size * sizeof(type) each iteration to get the next position
  const offset = 0 // start at the beginning of the buffer

  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  )

  // execute GLSL program
  const primitiveType = gl.TRIANGLES
  const offsetArrays = 0
  const count = 3
  gl.drawArrays(primitiveType, offsetArrays, count)

  console.log('successful init')
}

init()
