using UnityEngine;
using System.Collections;

public class ExplodingBuilding : MonoBehaviour
{
    public float ExplosionForce  = 4.0f;
	public float ExplosionRange = 50.0f;
    public FracturedObject TargetFracturedObject = null;

	public void ExplodeBuilding(){
		print("Boop");
		TargetFracturedObject.Explode(TargetFracturedObject.transform.position, ExplosionForce, ExplosionRange, true, true, false, false);
	}
}
