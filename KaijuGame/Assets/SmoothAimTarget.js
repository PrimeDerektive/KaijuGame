#pragma strict

var smoothing : float = 5.0;
private var aimTarget : Transform;

function Start () {
	aimTarget = GameObject.FindGameObjectWithTag("AimTarget").transform;
}

function Update(){
	transform.position = Vector3.Lerp(transform.position, aimTarget.position, Time.deltaTime*smoothing);
}