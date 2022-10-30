# MILTY(장병 근무 관리 웹 플랫폼)
![MILTY_logo](https://user-images.githubusercontent.com/69956347/192787713-99f639c0-2b12-42a8-a2fa-786493936995.png)



# 프로젝트 소개
## MILTY 기획의도
* 손쉬운 장병 근무 관리를 위한 주요 기능 구현
* 공정한 근무 분배를 위한 경작서 자동제작 알고리즘 설계
* 부대별 다양한 근무유형을 반영한 관리플랫폼 제작

## 근무자 주요 기능

<table>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/13505734/198883106-ceee89c2-85ae-4fa6-bc08-b072544d541a.png"  width = 400px height = 270px ></td>
    <td><img src="https://user-images.githubusercontent.com/13505734/198883271-7147a1e0-4218-450a-87e7-e5e7d6a73413.png" width = 400px height = 270px></td>
   </tr> 
   <tr>
      <td align="center">월간 근무현황 확인</td>
      <td align="center">근무 변경요청</td>
  </tr>
</table>
<table>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/13505734/198883553-d52852ba-8a3e-43fc-83a0-035224959748.png" width = 400px height = 270px ></td>
    <td><img src="https://user-images.githubusercontent.com/13505734/198883624-00198da0-e3ac-4583-be75-5b754e16dcbb.png" width = 400px height = 270px></td>
   </tr> 
   <tr>
      <td align="center">근무 통계 확인</td>
      <td align="center">건의사항 작성</td>
  </tr>
</table>


## 관리자 주요 기능

<table>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/13505734/198883965-c8055d7d-a3bc-4c2a-9978-6e1ebfb27de1.png"  width = 400px height = 270px ></td>
    <td><img src="https://user-images.githubusercontent.com/13505734/198883978-e8e747f8-e3c2-42ff-96bc-85c128686312.png" width = 400px height = 270px></td>
   </tr> 
   <tr>
      <td align="center">월간 경작서 자동생성</td>
      <td align="center">일일 경작서 확인</td>
  </tr>
</table>
<table>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/13505734/198884007-879573ad-ba23-4c1e-a033-d4d2c0f5ec25.png" width = 400px height = 270px ></td>
    <td><img src="https://user-images.githubusercontent.com/13505734/198884029-e74f59c4-184c-40fc-8973-4965484621d0.png" width = 400px height = 270px></td>
   </tr> 
   <tr>
      <td align="center">근무자 현황 관리</td>
      <td align="center">열외자 현황 관리</td>
  </tr>
</table>
<table>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/13505734/198883928-298b4cc0-38ca-411e-af09-3725ffcec86d.png" width = 400px height = 270px ></td>
    <td><img src="https://user-images.githubusercontent.com/13505734/198883871-be0d8f77-f938-4773-a80e-4d2bef17c439.png" width = 400px height = 270px></td>
   </tr> 
   <tr>
      <td align="center">근무 변경요청 승인/거부</td>
      <td align="center">건의사항 처리</td>
  </tr>
</table>

# 컴퓨터 구성 / 필수 조건 안내 (prerequisites)

* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상


# 기술 스택 (Technique Used)
<h3>Server(back-end)</h3>

* JavaScript(TypeScript), Node.js
* Express 프레임워크
* Maria DB(Sequelize orm 사용하여 Node.js와 Express랑 연동할 예정)
 
<h3>Front-end</h3>

* Html, Css, JavaScript(TypeScript)
* React.js
* React UI Library


# 설치 안내 (Installation Process)
```
$ 1. git clone https://github.com/osamhack2022-v2/WEB_MILTY_MILTY.git
$ 2. WEB(FE)에서 yarn install하고 yarn build / WEB(BE) 경로에서 npm install
$ 3. WEB(BE) 경로에서 npm start로 실행
```


# 프로젝트 사용법 (Getting Started)
Milty는 별도의 설정이나 메뉴얼 없이도 직관적인 UI를 통해 바로 사용이 가능합니다!


# 팀 정보 (Team Information)
* 김재준 (jkimkr08@gmail.com), Github Id: jaeiko
* 권종원 (ty_ty123@naver.com), Github Id: kwonjongwon123
* 이순형 (tnsgud9@naver.com), Github Id: tnsgud9
* 한동현 (hando1220@naver.com), Github Id: asitisdev
* 하승종 (hippo0419@daum.net), Github Id: hippo0419
* 김민철 (kminchul95@naver.com), Github Id: nyan101


# 저작권 및 사용권 정보 (Copyleft / End User License)

* MIT

This project is licensed under the terms of the MIT license.
