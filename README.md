![banner](https://github.com/hyunjihub/bomnae_mmm/assets/97017935/fd5cb3c8-0208-4d6f-b329-0c825066ce62)
# 봄내음 (Bomnae-mmm)
###### 봄내음은 춘천을 의미하는 ‘봄내’와 맛있는 음식을 먹을 때 자주 사용하는 감탄사 ‘음~’을 합친 이름으로, 춘천의 맛집, 카페, 놀거리 정보를 제공해주는 웹 사이트입니다.

[봄내음으로 이동하기](https://bomnae-mmm.web.app/)

## 개발 기간
##### 2024.04.12 ~ 2024.04.24 기획 및 UI
##### 2024.04.25 ~ 2024.05.17 기능 개발
##### 2024.05.18 ~ 2024.05.25 사용자 테스트 및 오류 수정

## 개발 환경 및 기술 스택

![](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)
![](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white)
![](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=flat-square&logo=visual%20studio%20code&logoColor=white) 
![](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)
![](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white)

![](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white)
![](https://img.shields.io/badge/styled--components-DB7093?style=flat-square&logo=styled-components&logoColor=white)
![](https://img.shields.io/badge/Redux-593D88?style=flat-square&logo=redux&logoColor=white)
![](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)

## 기능
1. 회원가입과 회원탈퇴
   ###### 회원가입시 users, likes Collection에 document를 생성하여 프로필 정보와 리뷰 정보를 저장할 수 있도록 구현하였다.
   ###### 회원탈퇴시 생성된 document를 삭제하여 회원 관련 document를 모두 삭제하도록 구현하였다.
2. 로그인과 로그아웃
   ###### 로그인 시 users Collection에서 email field가 동일한 document를 읽어와 Redux에 유저 정보를 저장하도록 구현하였다.
   ###### 로그아웃 시 Redux 변수 값을 초기화하도록 구현하였다.
3. Storage를 이용한 이미지 업로드와 프로필 변경
   ###### 이미지 업로드 시 Firebase의 Storage에 저장 후, Storage에서 반환한 URL을 이용하여 이미지를 렌더링하도록 구현하였다.
   ###### 닉네임과 프로필 이미지 변경 시 users Collection에서 uid field가 동일한 document에 변경된 값을 업데이트하고, Redux 변수 값을 변경하도록 구현하였다.
4. 재인증을 통한 비밀번호 재설정과 비회원 비밀번호 재설정
   ###### Prompt를 통해 입력받은 Password을 reauthenticateWithCredential을 이용하여 사용자를 재인증하도록 구현하였다.
   ###### 회원 비밀번호 재설정은 재인증을 거친 뒤 새로운 비밀번호를 업데이트하도록 구현하였다.
   ###### 비회원 비밀번호 재설정은 가입한 이메일 주소를 통해 비밀번호 재설정 링크를 전송하도록 구현하였다.
5. Redux와 Redux-persist를 이용한 상태 관리 및 상태 유지
   ###### Redux를 통해 로그인 유무, 닉네임, 프로필 이미지, uid, 관리자 계정 유무를 전역에서 관리하도록 구현하였다.
   ###### Redux-persist를 이용해 Redux 변수를 localStorage에 저장하여 새로고침 시 데이터가 소실되지 않고 유지될 수 있도록 구현하였다.
6. React Router를 이용한 비회원 접근 제한
    ###### Outlet을 이용하여 회원만 접근 가능한 페이지에 한해 로그인된 상태가 아닐 경우, 로그인 페이지로 이동되도록 구현하였다.
7. Firestore, Storage를 이용한 맛집 데이터 저장
    ###### Storage를 이용하여 맛집 데이터 이미지를 저장하여 Firestore에 저장하였다. 음식점의 경우 place_id를 1000번, 카페의 경우 place_id를 2000번대로 저장하여 구현하였다.
8. 무한스크롤과 Firestore를 이용한 맛집 데이터 출력
    ###### IntersectionObserver을 이용하여 무한스크롤을 구현하였으며, Firesotre의 query를 통해 음식점/카페를 구분하여 출력하도록 구현하였다.
9. 위치 필터와 종류 필터를 이용한 맛집 데이터 필터링 (혼합 가능)
    ###### useState와 useEffect를 이용하여 위치, 종류 필터가 변경될 때마다 필터 값에 맞도록 query를 변경하여 새로운 리스트를 출력하도록 구현하였다.
10. Firestore를 이용한 상호명 및 메뉴 검색
    ###### restaurants Collection에서 search 필드를 검색하여 일치하는 데이터를 출력하도록 구현하였다.
11. TimeStamp를 이용한 최근 등록 데이터 표시
    ###### TimeStamp을 내림차순으로 검색하여 상위 6개의 데이터만을 검색하여 최근 추가 페이지에 표시되도록 구현하였다.
12. 좋아요 기능을 통한 저장 및 마이페이지 표시
    ###### Firestore의 Likes Collection에 uid와 일치하는 문서를 읽어와 좋아요한 장소의 place_id 배열을 저장하여 restaurants Collection에서 place_id와 일치하는 데이터에 좋아요 표시가 되도록 구현하였다.
13. 후기 등록 및 삭제 가능 및 마이페이지 표시
    ###### Firestore의 reviews Collection에 후기 데이터를 저장하여 등록하도록 구현하였다.
    ###### uid field 값이 사용자 uid와 일치할 경우 삭제 버튼을 활성화하여 사용자 본인만 후기를 삭제할 수 있도록 구현하였다.
    ###### uid field 값이 사용자 uid와 일치하면서 TimeStamp를 기준으로 최근 등록된 3개의 후기를 반환하여 마이페이지에 표시되도록 구현하였다.
14. 네이버 Map API를 이용한 주소 변환 및 지도 표시
    ###### 데이터에 저장된 주소를 네이버 geocode을 통해 좌표로 변환한 뒤, 네이버 MAP API에 해당 값을 전달하여 해당 위치를 마커와 함께 표시하도록 구현하였다.
    ###### CORS 에러를 해결하기 위해 Firebase의 Cloud Functions를 사용하여 프록시 서버를 만들어 외부 API 호출을 대신 수행하도록 구현하였다.
15. 네이버 블로그 검색 API를 이용한 블로그 리뷰 표시
    ###### 데이터에 저장된 상호명을 네이버 블로그 검색 API에 전달하여 맛집과 관련된 블로그 글을 표시하도록 구현하였다.
    ###### CORS 에러를 해결하기 위해 Firebase의 Cloud Functions를 사용하여 프록시 서버를 만들어 외부 API 호출을 대신 수행하도록 구현하였다.
16. 맛집 등록 요청
    ###### 요청 데이터를 Firestore의 requests Collection에 저장하여 사용자의 추천 맛집 등록을 요청할 수 있도록 구현하였다.
17. (관리자 계정) 맛집 등록 요청 확인 및 후기 관리
    ###### user documnet 중 isAdmin field 값이 true인 계정에 한해 isAdmin(Redux)을 true로 설정하여 관리자 전용 기능을 이용할 수 있도록 구현하였다.
    ###### 관리자 계정은 맛집 등록 요청 페이지 대신 맛집 등록 요청 확인 페이지가 표시되며, requests Collection에 등록된 모든 요청들이 표시된다. 요청을 삭제할 경우 requests Collection에 저장된 document도 함께 삭제되도록 하였다.
    ###### 관리자 계정은 모든 후기를 삭제할 수 있는 권한을 가진다. 모든 후기에 삭제 버튼이 활성화되도록 구현하였다.
