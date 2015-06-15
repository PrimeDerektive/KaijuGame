#pragma strict
import RootMotion.FinalIK;

public class PickUp extends StateMachineBehaviour{

	private var look : LookAtIK;
	private var ik : FullBodyBipedIK;

	public override function OnStateEnter(animator : Animator, stateInfo : AnimatorStateInfo, layerIndex : int){
		look = animator.GetComponent.<LookAtIK>();
		ik = animator.GetComponent.<FullBodyBipedIK>();
	}
	
	public override function OnStateUpdate(animator : Animator, stateInfo : AnimatorStateInfo, layerIndex : int){
		ik.solver.rightHandEffector.positionWeight = animator.GetFloat("rightHandIK");
		//ik.solver.rightHandEffector.rotationWeight = animator.GetFloat("rightHandIK");
	}

}
	