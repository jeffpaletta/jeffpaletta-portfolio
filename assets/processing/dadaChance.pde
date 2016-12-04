// Jeffrey Paletta — 2015
// dadaChance.pde — v1.3

import java.util.Calendar;

PFont internal;
PFont external;

int value = 0;
int lineVal ;
int x = 0;
int y;
long[] keyRegister = new long[127];

int minSize=25;
int maxSize=100;

float[] data = new float[10];

float total = 0;
int p = 0, n = 0;
long lastPress=0;
//boolean sketchFullScreen() {
//  return true;
//}

void setup() {
  size(800, 500);
  //fullScreen();
  //background color
  background(255);  
  // Create the font
  internal = createFont("Georgia", 24);
  external = createFont("Verdana", 24);
  textAlign(LEFT, CENTER);
  println(average(100));
} 

void draw() {
  lineVal =  int(value/width);
  y = 50*lineVal +50;
  x = value - lineVal*(width); 
  //cursor color
  if (x%2==0) {
    //stroke(220);
    stroke(220);
    line(x+maxSize/2, y+4, x+maxSize/2, y);
  } 
  value+=1;
  /*if (y>height-100) {
    background(255);
    value=0;
  }*/
  println(lineVal);
}
void keyTyped() {
  println(key+" "+value);
  if (key>31&&key<128) {
    if (keyRegister[key]==0) {
      keyRegister[key]=millis();
    }
  }
}
void keyReleased() {
  if (key == ' ') saveFrame(timestamp()+"_##.png");
  if (key>31&&key<128) {
    int letterSize = (int)(millis()-keyRegister[key])/5;
    keyRegister[key]=0;
    int letterColour=(int)constrain(map(average(millis()-lastPress), 100, 1000, 0, 150), 0, 150);
    drawLetter(key, letterSize, letterColour, 0);
  }
}
void drawLetter(char letter, int size, int colour, int ext) {  
  char c[] = {
    letter
  };
  String s = new String(c);
  lastPress=millis();
  fill(colour);
  if (ext==0)    textFont(internal);
  else textFont(external);  
  if (size<minSize)size=minSize;
  if (size>maxSize)size=maxSize;  
  textSize(size);
  text(s, x, y);
}
int average(long value) {
  total -= data[p];
  data[p] = value;
  total += value;
  p = ++p % data.length;
  if (n < data.length) n++;
  return int(total / n);
}
String timestamp() {
  Calendar now = Calendar.getInstance();
  return String.format("%1$ty%1$tm%1$td_%1$tH%1$tM%1$tS", now);
}
