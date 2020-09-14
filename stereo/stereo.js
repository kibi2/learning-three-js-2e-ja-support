<h3 id="id_54f39e94">平行法</h3>
<div id="d3"><!--@@@@@--><canvas width="420" height="180"></canvas></div>
<h3 id="id_eba1429e">交差法</h3>
  <div id="d4"><!--@@@@@--><canvas width="420" height="180"></canvas></div>
<script type="text/javascript">
var t1, t2;
$(function(){
 var init = function(){
    var width  = 420, height = 180;

    // scene
    var scene = new THREE.Scene();

    // camera
    var camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000 );
    camera.position.set( 0,18,102 );
    camera.lookAt( scene.position );

    // light
    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 1, 1, 0 ).normalize();
    scene.add( light );

    // light2(ambient)
    var light2 = new THREE.AmbientLight( 0xffffff );
    scene.add( light2 );

    // ground
    var oneWidth = 30, oneHeight = 30, wUnits = 9, hUnits = 9;
    var groundGeo = new THREE.PlaneGeometry(oneWidth*wUnits, oneHeight*hUnits, wUnits, hUnits);
    for(var i=0, len = groundGeo.faces.length, f=-1; i<len; {
    f = -1;
      if((i/wUnits | 0)%2==1){f = ~f; }
      if((i%wUnits)%2==1){f = ~f; }
      groundGeo.faces[i].materialIndex = f+1;
    }
    var ground = new THREE.Mesh(
      groundGeo,
      new THREE.MeshFaceMaterial([
        new THREE.MeshBasicMaterial({color: 0x999999 }),
        new THREE.MeshBasicMaterial({color: 0x4d4d4d })
      ])
    );
    ground.rotation.x = -Math.PI/2;
    scene.add(ground);

    // ball
    var ball = new THREE.Mesh(
      new THREE.SphereGeometry( 5, 16, 16 ),
      new THREE.MeshPhongMaterial({color: 0x00b000, ambient:0x004f00, specular: 0xffffff, shininess: 30 } )
    );
    scene.add( ball );

    // xyz軸
    var axes = new THREE.AxisHelper(100);
    scene.add( axes );

    // renderer
    var renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize( width, height );

    var stereogram = new THREE.CrosseyedEffect_r1(renderer);
    stereogram.setSize(width,height);
    stereogram.separation = 0.15;  // 0<x<1 -> parallel, -1<x<0 -> cross
    stereogram.adjustment = 28;  // x>=0

    var container = $('#d3');
    container.append( renderer.domElement );

    var i = 0, j = 0, r = 30;
    var axis = (new THREE.Vector3(0,1,0)).normalize();

    t1 = function(){
    j = i * 0.28;
      ball.position.set( r*Math.sin(j), 12, r*Math.cos(j) );

      theta = 0.07;
      camera.position.applyAxisAngle(axis, theta);
      camera.lookAt(scene.position);

      stereogram.render(scene, camera);
      i++;
    };

 };

 var init2 = function(){
    var width  = 420, height = 180;

    // scene
    var scene = new THREE.Scene();

    // camera
    var camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000 );
    camera.position.set( 0,18,102 );
    camera.lookAt( scene.position );

    // light
    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 1, 1, 0 ).normalize();
    scene.add( light );

    // light2(ambient)
    var light2 = new THREE.AmbientLight( 0xffffff );
    //light2.position.set( -1, -1, 0 ).normalize();
    scene.add( light2 );

    // ground
    var oneWidth = 30, oneHeight = 30, wUnits = 9, hUnits = 9;
    var groundGeo = new THREE.PlaneGeometry(oneWidth*wUnits, oneHeight*hUnits, wUnits, hUnits);
    for(var i=0, len = groundGeo.faces.length, f=-1; i<len; {
    f = -1;
      if((i/wUnits | 0)%2==1){f = ~f; }
      if((i%wUnits)%2==1){f = ~f; }
      groundGeo.faces[i].materialIndex = f+1;
    }
    var ground = new THREE.Mesh(
      groundGeo,
      new THREE.MeshFaceMaterial([
        new THREE.MeshBasicMaterial({color: 0x999999 }),
        new THREE.MeshBasicMaterial({color: 0x4d4d4d })
      ])
    );
    ground.rotation.x = -Math.PI/2;
    scene.add(ground);

    // ball
    var ball = new THREE.Mesh(
      new THREE.SphereGeometry( 5, 16, 16 ),
      new THREE.MeshPhongMaterial({color: 0x00b000, ambient:0x004f00, specular: 0xffffff, shininess: 30 } )
    );
    scene.add( ball );

    // xyz軸
    var axes = new THREE.AxisHelper(100);
    scene.add( axes );

    // renderer
    var renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize( width, height );

    var stereogram = new THREE.CrosseyedEffect_r1(renderer);
    stereogram.setSize(width,height);
    stereogram.separation = -0.15;  // 0<x<1 -> parallel, -1<x<0 -> cross
    stereogram.adjustment = 28;  // x>=0

    var container = $('#d4');
    container.append( renderer.domElement );

    var i = 0, j = 0, r = 30;
    var axis = (new THREE.Vector3(0,1,0)).normalize();

    t2 = function(){
    j = i * 0.28;
      ball.position.set( r*Math.sin(j), 12, r*Math.cos(j) );

      theta = 0.07;
      camera.position.applyAxisAngle(axis, theta);
      camera.lookAt(scene.position);

      stereogram.render(scene, camera);
      i++;
    };

 };

  if ( Detector.webgl ){
    init();
    init2();
  }else{
    $('#d3').html('<span style="color:red;">あなたが使用中のブラウザはWebGL非対応もしくはWebGLが有効になっていません。</span>');
    $('#d4').html('<span style="color:red;">あなたが使用中のブラウザはWebGL非対応もしくはWebGLが有効になっていません。</span>');
  }

  (function(){
    t1();
    t2();
    setTimeout(arguments.callee, 70);
  })();

});


</script>
