#pragma strict

var aimTarget : Transform;
var range : float = 500.0;
var layerMask : LayerMask;

function Start(){
	if(!aimTarget) aimTarget = GameObject.FindGameObjectWithTag("AimTarget").transform;
}

function LateUpdate () {
	var hit : RaycastHit;
	if(Physics.Raycast(transform.position, transform.forward, hit, range, layerMask)){
		aimTarget.position = hit.point;
	}
	else{
		aimTarget.position = transform.position + transform.forward * range;
	}
}