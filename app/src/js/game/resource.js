var res = {
    baozha:"xksds_band.png",
    title:"xksds_head_title.png",
    peopleHead:"xksds_ren01.png",
    headbtn:"xksds_head_btn.png",
    headbtnleft:"xksds_head_kai1.png",
    headbtnrigth:"xksds_head_kai2.png",
    people:"xksds_ren02.png",
    hand2:"xksds_human_hand.png",
    hand:"xksds_human_hand2.png",
    hitpeople:"xksds_sleep_nosuccess.png",
    stone:"xksds_Level_3.png",
    stone1:"xksds_Level_3_1.png",
    stone2:"xksds_Level_3_2.png",
    stoneSui:"xksds_Level_3_3.png",
    peopleFailed:"xksds_ren-over04.png",
    peopleGood1:"xksds_ren-win03.png",
    sleeperSuccess:"xksds_sleep_success.png",
    sleeperFailed:"xksds_sleep_duan.png",
    shootBg:"xksds_shootbg.png",
    shootArea:"xksds_shootarea.png",
    shooter:"xksds_shooter.png",
    suibtn:"xksds_suibtn.png",
    suibtnpress:"xksds_suibtnpress.png",
    gameover:"xksds_gameover.png"
};
var start_resources =[];
var staticImage = window.staticImage||"res/img/";
for(var i in res){
    res[i] = staticImage + res[i];
    start_resources.push(res[i]);
}

module.exports = {
    res:res,
    start_resources:start_resources
};
/*
var start_resources =[
    res.baozha,
    res.againBtn1,
    res.againBtn2,
    res.title,
    res.bg,
    res.peopleHead,
    res.headbtn,
    res.headbtnleft,
    res.headbtnrigth,
    res.people,
    res.hand,
    res.hitpeople,
    res.eye1,
    res.eye2,
    res.stone,
    res.stone1,
    res.stone2,
    res.peopleFailed,
    res.peopleSuccess,
    res.peopleGood1,
    res.peopleGood2,
    res.sleeperSuccess,
    res.sleeperFailed,
    res.sleepMiddleFrame,
    res.shootBg,
    res.shootArea,
    res.shooter
];*/
