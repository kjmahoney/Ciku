

function init(){
  //Click Functionality_______________
  speed = 0.01
  var w = (window.innerWidth)


  increaseSpeed = function(){
     speed = speed + .08;
  }

  decreaseSpeed = function(){
    speed = speed -.1;
  }

  //Render Shapes
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById("myCanvas"), antialias:true});
  //set the default color of the scene
  renderer.setClearColor(0x00001A);
  //sets pixel ratio
  renderer.setPixelRatio(window.devicePixelRatio);
  //set size of canvas
  renderer.setSize(500,300);


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

  //defines each side of the cube based on window height
  if (window.innerWidth < 400){
    var geometry = new THREE.CubeGeometry(50,100,50)
  }else if(window.innerWidth < 500){
    var geometry = new THREE.CubeGeometry(75,150,75)
  }else if(window.innerWidth < 600) {
    var geometry = new THREE.CubeGeometry(100,150,100)
  }else if(window.innerWidth < 700){
    var geometry = new THREE.CubeGeometry(125,150,125)
  }else{
    var geometry = new THREE.CubeGeometry(150,150,150)
  }

  //draws on the sides of the cubes
  var material = new THREE.MeshNormalMaterial({
    color: 0x0D9AFF,
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
