const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //2d 컨텍스트 얻어오기

const getRandomRadius =  () => Math.random() * 1.5; // 눈의 크기
const getRandomSpeed = () => Math.random() * 0.3 + 0.5; // 눈의 속도
const getRandomDir = () => [-1,1][Math.floor(Math.random() * 2)];   // 눈의 방향

// 창크기에 맞춰서 눈 크기가 정해짐
window.onresize = () =>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    Snow.make();
  }

const getCanvasSize = () =>{    // 캔버스 사이즈 가져오기
    const canvasWidth = canvas.clientWidth;  //실제로 보여지고 있는 컨텐츠 넓이
    const canvasHeight = canvas.clientHeight; //실제로 보여지고 있는 컨텐츠 높이

    return { canvasWidth, canvasHeight};
}

const Snow = {
    data: [],
  
    init() {
        Snow.make();
        Snow.loop();
    },
  
    loop() {
        // 눈을 이동시킨 후, 그리기
        Snow.move();
        Snow.draw();

        // Snow.loop() 함수를 계속 재귀함
        window.requestAnimationFrame(Snow.loop);
    },
  
    make() {
        const data = [];
        const canvasWidth = canvas.clientWidth;
        const canvasHeight = canvas.clientHeight;

        // 랜덤한 데이터 200개 생성
        for(let i=0;i<200;i++){
            const x = Math.random() * canvasWidth;
            const y = Math.random() * canvasHeight;

            const size = getRandomRadius();
            const speed = getRandomSpeed();
            const dir = getRandomDir();

            data.push({x,y,size,speed,dir});
        }

        // Snow 객체에 데이터 저장
        Snow.data = data;
    },
  
    move() {
        const { canvasWidth, canvasHeight} = getCanvasSize();

        Snow.data = Snow.data.map((item)=>{

            // 방향에 맞게 이동
            item.x += item.dir * item.speed;  
            item.y += item.speed;             

            // 캔버스를 벗어났는지 판단
            const isMinOverPositionX = 0 > item.x;
            const isMaxOverPositionX = item.x > canvasWidth;

            // 벗어나면 반대방향, 맨 위로이동
            if(isMinOverPositionX || isMaxOverPositionX){
                item.dir *= -1;
            }
            if(item.y > canvasHeight){
                item.y = -item.size;
            }
            return item;
        });
    },
  
    draw() {
        const { canvasWidth, canvasHeight} = getCanvasSize();

        // 캔버스 지우기
        ctx.clearRect(0,0,canvasWidth,canvasHeight);

        // 검은 배경화면 채우기
        ctx.fillStyle = "#0f1018";
        ctx.fillRect(0,0,canvasWidth,canvasHeight); // 색칠된 직사각형을 그린다.

        // move된 데이터를 그려주기
        Snow.data.forEach((item)=>{
            ctx.beginPath();  // 경로 시작
            ctx.fillStyle = "rgba(255,255,255,.6)";
            ctx.arc(item.x,item.y,item.size,0,Math.PI*2);   //원을 그릴 수 있게 해주는 메소드(x,y반지름,시작각도,끝 각도,방향설정)
            ctx.fill(); //path 내부를 채워준다.
            ctx.closePath();    // 경로 끝
        });
    },
  };
console.log()

  // 눈 그리기 시작
  Snow.init();
