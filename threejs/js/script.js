const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

function cube() {
  // creating & adding cube
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  camera.position.z = 5

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  }

  animate()
}

function line() {
  camera.position.set(0, 0, 100)
  camera.lookAt(0, 0, 0)

  const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
  const geometry = new THREE.Geometry()
  geometry.vertices.push(new THREE.Vector3(-10, 0, 0))
  geometry.vertices.push(new THREE.Vector3(0, 10, 0))
  geometry.vertices.push(new THREE.Vector3(10, 0, 0))

  const line = new THREE.Line(geometry, material)

  scene.add(line)

  let x = 0.1

  console.log(renderer)

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    if (line.position.x >= window.innerWidth) {
      x = -0.1
    } else if (line.position.x <= 0) {
      x = 0.1
    }

    line.position.x += x
    // console.log(line.position)
  }

  animate()
}
