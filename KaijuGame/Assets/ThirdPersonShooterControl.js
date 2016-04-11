#pragma strict
import UnityEngine.Networking;

public class ThirdPersonShooterControl extends NetworkBehaviour{

	var dampTime : float = 0.2;
	var turnInPlaceSpeed : float = 5.0;
	var turnInTurnTransition : boolean = true;
	var turnWhileMovingSpeed : float = 5.0;

	private var anim : Animator;
	private var cam : Transform;
	private var aimPos : Vector3;

	function Start () {
		anim = GetComponent.<Animator>();
		cam = Camera.main.transform;
	}

	function Update () {

		if(!isLocalPlayer){
			return;
		}
		
		var speedX = Input.GetAxis("Horizontal");
		var speedY = Input.GetAxis("Vertical");
		anim.SetFloat("speedX", speedX, dampTime, Time.deltaTime);
		anim.SetFloat("speedY", speedY, dampTime, Time.deltaTime);	
		
		var targetDir = cam.forward;
		targetDir.y = transform.forward.y; //kill Y so we only rotate on Y axis
		var angleDifference = Utilities.FindTurningAngle(transform.forward, targetDir);
		anim.SetFloat("direction", angleDifference);
		
		var currentState = anim.GetCurrentAnimatorStateInfo(0);
		var nextState = anim.GetNextAnimatorStateInfo(0);
		
		if(
			currentState.IsName("TurnRight") ||
			currentState.IsName("TurnLeft") || 
			(turnInTurnTransition  && (nextState.IsName("TurnRight") || nextState.IsName("TurnLeft")))
		)	
			transform.eulerAngles.y = Mathf.LerpAngle(transform.eulerAngles.y, cam.eulerAngles.y, Time.deltaTime*turnInPlaceSpeed);
		else if(speedX > 0.1 || speedY > 0.1 || speedX < -0.1 || speedY < -0.1)
			transform.eulerAngles.y = Mathf.LerpAngle(transform.eulerAngles.y, cam.eulerAngles.y, Time.deltaTime*turnWhileMovingSpeed);
			
		aimPos = cam.position + cam.forward * 50.0;
		
	}

}