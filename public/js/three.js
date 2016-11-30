
function init(){
  //Click Functionality_______________
  speed = 0.1

  clicker = function(){
    speed = speed + 0.01
    let answer = answers[Math.floor((Math.random() * 2))]
    console.log(speed)
  }

  stopClicker = function(){
    speed = 0
  }

  var answers= ["yes", "no"]
  //Render Shapes
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("myCanvas"), antialias:true});
  //set the default color of the scene
  renderer.setClearColor(0xF4AB7B);
  //sets pixel ratio
  renderer.setPixelRatio(window.devicePixelRatio);
  //set size of canvas
  renderer.setSize(800 ,400);


  //parameters: Field of view, aspect ratio, near, far = tihings too close or far no longer re render
  var camera =new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
  // contatiner object that holds everything
  var scene = new THREE.Scene();
  camera.position.set(0,0,0)//default value

  //parameters: color, intensity
  var light = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(light)
  //works from the same point as our camera
  var lightPoint = new THREE.PointLight(0xffffff, 0.5)
  scene.add(lightPoint)

  //defines each side of the shape
  var geometry = new THREE.CubeGeometry(100,100,100)
  //draws on the sides of the cubes
  var material = new THREE.MeshNormalMaterial({
    color: 0xF3FFE2,
    wireframe: false
  });
  //enter variables into mesh
  var mesh = new THREE.Mesh(geometry,material)
  mesh.position.set(0,0,-1000) //change default here so that camera isnt on the mesh


  scene.add(mesh);

  //set up a render loop
  requestAnimationFrame(render);

  function render(){
    mesh.rotation.x += speed;
    mesh.rotation.y += speed;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  renderer.render(scene,camera)
}
