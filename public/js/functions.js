var create_rectangle = function(x,y,stage){
	var rectangle = new PIXI.Graphics();
	rectangle.lineStyle(4, 0xFF3300, 1);
	rectangle.beginFill(0x66CCFF);
	rectangle.drawRect(0, 0, 64, 64);
	rectangle.endFill();
	rectangle.x = x;
	rectangle.y = y;
	stage.addChild(rectangle);

	return rectangle;
}

var create_circle = function(x,y,stage){
	var circle = new PIXI.Graphics();
	circle.lineStyle(4, 0xFF3300, 1);
	circle.beginFill(0x9966FF);
	circle.drawCircle(0, 0, 32);
	circle.endFill();
	circle.x = x;
	circle.y = y;
	circle.interactive = true;
	circle.is_circle = true;
  circle.buttonMode = true;

  circle
    // events for drag start
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    // events for drag end
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    // events for drag move
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);

	stage.addChild(circle);

	return circle;
}

function onDragStart(event){
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd(){
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
}

function onDragMove(){
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}

function getCenter(obj){
	if(obj.is_circle){
		return {x: obj.x, y: obj.y};
	}else{
		return {x: obj.x + obj.halfWidth, y: obj.y + obj.halfHeight};
	}
}

function hitTestRectangle(r1, r2){

  //Define the variables we'll need to calculate
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  var r1_center = getCenter(r1);
  r1.centerX = r1_center.x;
  r1.centerY = r1_center.y;
  var r2_center = getCenter(r2);
  r2.centerX = r2_center.x;
  r2.centerY = r2_center.y;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x and y axis
  if (Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights) {
    hit = true;
  }

  //`hit` will be either `true` or `false`
  return hit;
};