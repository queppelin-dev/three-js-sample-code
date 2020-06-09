let rot = document.getElementById('rot');
let drag = document.getElementById('drag');
drag.addEventListener('click',(event)=>{
    rot.checked = false;
    controlDrag = true;
    dragcontrols.activate();
    if(objectcontrols instanceof THREE.ObjectControls){
        objectcontrols.objectToMove.material.opacity = 0;
        objectcontrols.objectToMove.material.transparent = true;
        objectcontrols.deactivate();
    }
    controls.enabled = true;
    controls.update();
    console.log('Drag',controlDrag)
});
rot.addEventListener('click',(event)=>{
    drag.checked = false;
    controlDrag = false;
    dragcontrols.deactivate()
    console.log('Drag',controlDrag)
    alert('Double click on the Model to rotate and rescale. Press escape to unselect the model and double click on any other model to rotate and rescale');
    controls.enabled = false;
    controls.update();
})
container.addEventListener('dblclick', rotateTarget)
document.addEventListener('keydown', (event)=>{
    if(event.keyCode == 27){
        console.log('escape');
        if(objectcontrols instanceof THREE.ObjectControls){
            objectcontrols.objectToMove.material.opacity = 0;
            objectcontrols.objectToMove.material.transparent = true;
            objectcontrols.deactivate();
        }
    }
    if(event.code == 'KeyS' && slistener == true){
        console.log('Save')
        console.log(sceneState)
        sceneState.noOfModels = models.length;
        sceneState.models = [];
        gridhelpers.forEach((model)=>{
            console.log(model)
            let modelState = {
                proid: model.proid,
                location: {
                    x: model.position.x,
                    y: model.position.y,
                    z: model.position.z
                },
                rotation: {
                    x: model.rotation.x,
                    y: model.rotation.y,
                    z: model.rotation.z
                },
                gridscale: model.scale.x,
                modelscale: model.children[0].scale.x
            }
            sceneState.models.push(modelState);
        })
        sceneState.panorama = panoramaState;
        console.log(sceneState.panorama);
        let projects = sceneState.models.map((model)=>{return model.proid});
        console.log(projects);
        let xhttp = new XMLHttpRequest();
        xhttp.open('POST','scenestate.php');
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4 && xhttp.status == 200){
                console.log(xhttp.response)
            }
        }
        let form  = new FormData();
        form.append('data', JSON.stringify(sceneState))
        form.append('projects', JSON.stringify(projects))
        form.append('id', editid);
        xhttp.send(form);
    }
})
function rotateTarget(e){
    console.log(e);
    if(objectcontrols instanceof THREE.ObjectControls){
        objectcontrols.objectToMove.material.opacity = 0;
        objectcontrols.objectToMove.material.transparent = true;
        objectcontrols.deactivate();
    }
    document.addEventListener('keydown', (event)=>{
        if(event.keyCode == 27){
            console.log('escape');
            upDom.removeEventListener('click', upScale)
            downDom.removeEventListener('click', downScale)
        }
    })
    let downDom = document.getElementById('down');
    let upDom = document.getElementById('up');

    let mouse = new THREE.Vector2();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    let _raycaster = new THREE.Raycaster();
    _raycaster.setFromCamera(mouse, camera);
    let _intersection = new THREE.Vector3();
    _intersection = _raycaster.intersectObjects(scene.children);
    let objecttomove = _intersection[0].object;
    console.log(objecttomove);
    objectcontrols = new THREE.ObjectControls(camera, renderer.domElement, objecttomove);
    objectcontrols.setZoomSpeed(0)
    objecttomove.material.opacity = 1;
    objecttomove.material.transparent = false;
    // function scale(event) {
    //     let value = event.target.value;
    //     console.log(value);
    //     objecttomove.children.forEach((mesh)=>{
    //         if(mesh.type == 'Mesh'){
    //             mesh.scale.set(value,value,value)
    //         }
    //     })
    //     objecttomove.scale.set(value,value,value);        
    // }
    
    // let scaleDom = document.getElementById('scale');
    // scaleDom.addEventListener('change', scale);
    function upScale(event) {
        console.log(objecttomove);
        objecttomove.children.forEach((mesh)=>{
            if(mesh.type == 'Mesh'){
                mesh.scale.set(mesh.scale.x+0.1,mesh.scale.y+0.1,mesh.scale.z+0.1)
                console.log('Mesh',mesh.scale)
            }
        })
        objecttomove.scale.set(objecttomove.scale.x+0.4,objecttomove.scale.y+0.4,objecttomove.scale.z+0.4);
        console.log(objecttomove.scale);
    }
    function downScale(event) {
        console.log(objecttomove);
        objecttomove.children.forEach((mesh)=>{
            if(mesh.type == 'Mesh'){
                mesh.scale.set(mesh.scale.x-0.1,mesh.scale.y-0.1,mesh.scale.z-0.1)
                console.log('Mesh',mesh.scale)
            }
        })
        objecttomove.scale.set(objecttomove.scale.x-0.4,objecttomove.scale.y-0.4,objecttomove.scale.z-0.4);
        console.log(objecttomove.scale);
    }
    downDom.addEventListener('click', downScale);
    upDom.addEventListener('click', upScale);
}
dragcontrols = new THREE.DragControls(gridhelpers,camera,container);
dragcontrols.addEventListener('dragstart', function(event) {
    controls.update();
    controls.enabled = false;
    controls.update();
});
dragcontrols.addEventListener('dragend', function(event) {
    controls.update();
    controls.enabled = true;
    controls.update();
});
// objectcontrols = new THREE.ObjectControls(camera, renderer.domElement, model);