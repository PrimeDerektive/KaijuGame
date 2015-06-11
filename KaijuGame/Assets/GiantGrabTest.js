#pragma strict
import RootMotion.FinalIK;

var look : LookAtIK;
var ik : FullBodyBipedIK;

function Start(){
	look.Disable();
	ik.Disable();
}

function LateUpdate(){
	ik.solver.Update();
	look.solver.Update();
}