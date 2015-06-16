#pragma strict

var fracturedObject : FracturedObject;

function Start(){
	fracturedObject.Explode(transform.position, 100.0);
}