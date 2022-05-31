
var messageData;
var isWeb = true;
const LOCAL_GAME_KEY = "CS_SENSORIAL_L1"
function setWeb()
{
	if (confirm("Playing in browser?")) {
	  isWeb = true;
	} else {
		messageData = message.data;
	  isWeb = false
	}
}
localStorage.setItem(LOCAL_GAME_KEY, ""); //uncomment if want to clear cached progress in web

var levelDetails = 
{"currentLevel":{"level":0,"presentationCompleted":0},"level0":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0}},"level1":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0},"completed":0,"playCount":0,"completedCount":0,"timeSpent":0,"correctAttempts":0,"incorrectAttempts":0},"level2":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0},"completed":0,"playCount":0,"completedCount":0,"timeSpent":0,"correctAttempts":0,"incorrectAttempts":0},"level3":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0},"completed":0,"playCount":0,"completedCount":0,"timeSpent":0,"correctAttempts":0,"incorrectAttempts":0},"level4":{"presentation":{"completed":0,"playCount":0,"completedCount":0,"timeSpent":0},"completed":0,"playCount":0,"completedCount":0,"timeSpent":0,"correctAttempts":0,"incorrectAttempts":0}}



// comment below 3 line if with app else uncomment
//made counts "0" to "1" for all along with the timespent
var message = {"data":{}};
message.data = {"learningTrackid":1,"gameId":1,"gameVersion":"string","predGameId":0,"gamePath":"https://kreedo-game-upload-poc.s3.us-east-2.amazonaws.com/701_LearningTeens.zip","isActive":true,"isblocked":false,"isGameDownloadComplete":true,"gameName":"Circle Sorter","attemptId":0,"totalRewards":0,"completedCount":1,"startDateTime":"","endDateTime":"","completed":1,"isMusic":1,"rewardsPerLevel":10,"levelDetails":{"currentLevel":{"level":4,"presentationCompleted":1},"level0":{"presentation":{"completed":1,"playCount":1,"completedCount":1,"timeSpent":50}},"level1":{"presentation":{"completed":1,"playCount":1,"completedCount":1,"timeSpent":60},"completed":1,"playCount":1,"completedCount":1,"timeSpent":60,"correctAttempts":12,"incorrectAttempts":0},"level2":{"presentation":{"completed":1,"playCount":1,"completedCount":1,"timeSpent":60},"completed":1,"playCount":1,"completedCount":1,"timeSpent":60,"correctAttempts":20,"incorrectAttempts":0},"level3":{"presentation":{"completed":1,"playCount":1,"completedCount":1,"timeSpent":60},"completed":1,"playCount":1,"completedCount":1,"timeSpent":60,"correctAttempts":20,"incorrectAttempts":0},"level4":{"presentation":{"completed":1,"playCount":1,"completedCount":1,"timeSpent":60},"completed":1,"playCount":1,"completedCount":1,"timeSpent":60,"correctAttempts":20,"incorrectAttempts":0}}};


//app will trigger this event on load finish.
// uncomment this listener if with app else comment
document.addEventListener("message", handleEvent);

function handleEvent(messageTemp) {	
	isWeb = false;
	messageData =  messageTemp.data;	
}

runOnStartup(async runtime =>
{
  	//if(isWeb) setWeb();
	
	if(isWeb){
		const local_data = localStorage.getItem(LOCAL_GAME_KEY);
		if(local_data!=null && local_data !== ""){			
			const data = JSON.parse(local_data)	
			messageData=data;
			console.log("Web - LocalStorage", data);
		}
		else{
			messageData = message.data;
			console.log("Web - Default Data: ", JSON.stringify(messageData));
		}
	}
	else{
		console.log("loaded from app ", messageData);
	}


	
	if(messageData){		
		messageData.completedCount = 1;
		messageData.levelDetails.level0 = levelDetails.level0;
		messageData.levelDetails.level1 = levelDetails.level1;
		messageData.levelDetails.level2 = levelDetails.level2;
		messageData.levelDetails.level3 = levelDetails.level3;
		messageData.levelDetails.level4 = levelDetails.level4;
		runtime.globalVars.GameID = messageData.gameId;
		runtime.globalVars.GameName = messageData.gameName;		
		runtime.globalVars.AttemptID = messageData.attemptId;
		runtime.globalVars.IsWeb = isWeb;
		runtime.globalVars.LOCAL_GAME_KEY = LOCAL_GAME_KEY;
		runtime.globalVars.RewardPoints = messageData.totalRewards;
		runtime.globalVars.RewardsPerLevel = messageData.rewardsPerLevel;
		runtime.globalVars.isMusic = messageData.isMusic;		
        runtime.globalVars.isGameCompleted = messageData.completed;
		runtime.globalVars.GameCompletedCounter = 1; //changed the completed binary code as 1 by Byshadh
		runtime.globalVars.GameLevel = messageData.levelDetails.currentLevel.level;  //Start level should be 1 for this game as it does not conatins Level0
	
        if(runtime.globalVars.isGameCompleted)
        {
            runtime.globalVars.L4_Tutorial_Done = 1
			runtime.globalVars.L3_Tutorial_Done = 1;
			runtime.globalVars.L2_Tutorial_Done = 1;
			runtime.globalVars.L1_Tutorial_Done = 1;						
			runtime.globalVars.L0_Tutorial_Done = 1;

			runtime.globalVars.L1_Completed = 1;
			runtime.globalVars.L2_Completed = 1;
			runtime.globalVars.L3_Completed = 1;
            runtime.globalVars.L4_Completed = 1;
            ;
        }
        else{
            if(runtime.globalVars.GameLevel == 0){
                runtime.globalVars.L0_Tutorial_Done =messageData.levelDetails.currentLevel.presentationCompleted
             //remaining are false by default
            }
            else if(runtime.globalVars.GameLevel == 1){
                
                runtime.globalVars.L1_Tutorial_Done = messageData.levelDetails.currentLevel.presentationCompleted	
                runtime.globalVars.L0_Tutorial_Done = 1;
				console.log(">>>>>>>>>>>>>>>>>>>>>>>",messageData.levelDetails.currentLevel)
                }
            else if(runtime.globalVars.GameLevel == 2){
                runtime.globalVars.L2_Tutorial_Done = messageData.levelDetails.currentLevel.presentationCompleted;
                runtime.globalVars.L1_Tutorial_Done = 1;			
                runtime.globalVars.L0_Tutorial_Done = 1;
                
                runtime.globalVars.L1_Completed = 1;
                }
            else if(runtime.globalVars.GameLevel == 3){
                runtime.globalVars.L3_Tutorial_Done = messageData.levelDetails.currentLevel.presentationCompleted
                runtime.globalVars.L2_Tutorial_Done = 1;
                runtime.globalVars.L1_Tutorial_Done = 1;
                runtime.globalVars.L0_Tutorial_Done = 1;
                
                
                runtime.globalVars.L1_Completed = 1;
                runtime.globalVars.L2_Completed = 1;
                }
            else if(runtime.globalVars.GameLevel == 4){
                runtime.globalVars.L4_Tutorial_Done = messageData.levelDetails.currentLevel.presentationCompleted
                runtime.globalVars.L3_Tutorial_Done = 1;
                runtime.globalVars.L2_Tutorial_Done = 1;
                runtime.globalVars.L1_Tutorial_Done = 1;						
                runtime.globalVars.L0_Tutorial_Done = 1;

                runtime.globalVars.L1_Completed = 1;
                runtime.globalVars.L2_Completed = 1;
                runtime.globalVars.L3_Completed = 1;			
                }
            else {
        		console.log("current level "+runtime.globalVars.GameLevel);
            }
        }
			
				   
	}
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));	
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	runtime.getInstanceByUid(runtime.globalVars.JSON_UID).setJsonDataCopy(messageData);
	console.log("CONSTRUCT_JSON_DATA_SET", runtime.getInstanceByUid(runtime.globalVars.JSON_UID).getJsonDataCopy())
	runtime.addEventListener("tick", () => Tick(runtime));
}

function Tick(runtime)
{
	// Code to run every tick
}
