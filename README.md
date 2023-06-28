Chess game mini project
=
Developed by Jihan(2023.06.25 ~)

`$npm start`
=
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


TodoList
=
#### functional
- [x] 체스말 움직임
- [x] 차례 넘기기
- [x] 클릭했을 시 움직일 수 있는 곳 보여주고, 클릭하면 움직임
- [x] 드래그 앤 드랍으로 체스말 움직임
- [x] 체크
- [x] 체크메이트
- [ ] 체스판 회전
- [x] 스테일메이트
- [ ] 캐슬링
- [ ] 프로모션
- [ ] 앙파상
- [ ] 시간제한
- [ ] 무승부 규칙(반복수, 50수)

#### style
- [x] 체스판 디자인
- [x] 체스판 레이아웃 구성
- [ ] 체스말 이동 애니메이션 + 소리
- [ ] 페이지 레이아웃 구성
- [ ] 반응형 해상도 설정
- [ ] 체스판 theme custom
- [ ] 잡힌 기물 보여주기
- [ ] 기물점수 표시

#### additional
- [ ] 체스 엔진 탑재
- [ ] 웹소켓으로 실시간 대전
- [ ] 로그인, 회원가입 및 플레이어 프로필
- [ ] 게임로비


- - -
#### NOTE
- 착수를 위해 말들이 움직일 수 있는 칸 확인(moveable point 렌더링) 과정

 if 본인이 체크당한 상태인가? (킹이 위협받은 상태인가?)
 .Y 체크를 피할 수 없는 상태인가?
 .Y.Y 체크메이트
 .Y.N 체크를 피할 수 있는 움직임인가를 체크하여 moveable Point 렌더링해줌
 .N 움직일 수 있는 칸이 없는가?
 .N.Y 스테일메이트(무승부)
 .N.N 내가 수를 둠으로써 상대가 위협하고 있는 square에 king이 포함되지 않도록 하는 moveable Point 렌더링해줌

1. 체크당한 상태인가 어떻게 확인?
 => 상대의 whole moveable point에 플레이어의 킹이 위치하고 있는지 확인

2. .Y에서 체크를 피할 수 없는 상태인가 어떻게 확인?
 => 각각의 수를 두었을 때 1에서의 상태가 해소되는지 시뮬레이션하여 해소되는 경우의 수가 존재하는지 확인

3. 2의 과정에서 전체 시뮬레이션 하는 함수로 .Y.N에서 움직일 수 있는 칸 필터링해주면 될 듯

4. .N에서 움직일 수 있는 칸이 없는지 어떻게 확인?
 =>플레이어의 whole moveable point 에 true가 존재하는가 확인.

5. .N.N에서 상대가 위협하고 있는 square에서 king이 포함되지 않도록 한다는 말은?
 => king이 상대가 위협하고 있는 square로 이동 불가,
 => 내가 king 이외의 기물을 움직여서 king이 상대 기물의 공격에 노출되도록 만드는 것이 불가

 결론적으로 움직일 수 있는 모든 경우의 수에 대해서 착수 이후에 상대 기물의 위협에 킹이 노출되는지 확인한 뒤에 해당 경우의 수로 착수가 가능하다고 플레이어에게 보여줘야 함.