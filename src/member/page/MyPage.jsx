import { EmailAuthProvider, deleteUser, reauthenticateWithCredential, signOut } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { appAuth, appFireStore, appStorage } from '../../firebase/config';
import { collection, deleteDoc, doc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { setLogin, setMemberid, setName, setProfileimg } from '../../redux/login';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { FaCamera } from 'react-icons/fa';
import LikeList from '../component/LikeList';
import ReviewList from '../component/ReviewList';
import Swal from 'sweetalert2';
import profile from '../../common/resource/img/profile.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div`
  width: 100vw;
  height: 1100px;
  background-color: #f7f6f9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5vh 6vw;
  margin-left: 230px;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 170px;
    height: 950px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 0;
    height: 1250px;
    padding: 3vh 2vw;
  }
`;

const PageContainer = styled.div`
  box-sizing: border-box;
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 35rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 23rem;
  }
`;

const PorfileBox = styled.div`
  box-sizing: border-box;
  width: 45rem;
  border-radius: 16px;
  padding: 4vh 4vw;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 35rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 23rem;
    padding: 3vh 3vw;
  }
`;

const ProfileContainer = styled.div`
  background-color: transparent;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    gap: 1.5rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 0;
    gap: 1rem;
  }
`;

const ImgBox = styled.div`
  position: relative;
`;

const ProfileImg = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 12rem;
    height: 12rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 9rem;
    height: 9rem;
  }
`;

const Upload = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: #d9d9d9;
  border: none;
  border-radius: 50%;
  position: absolute;
  bottom: 1rem;
  right: 0.5rem;
  cursor: pointer;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    bottom: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 2rem;
    height: 2rem;
    bottom: 1.2rem;
  }
`;

const InfoBox = styled.div`
  width: 15rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.name {
    padding: 0;
    flex-direction: row;
    align-items: baseline;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    gap: 0.3rem;
  }
  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 9rem;
    gap: 0.3rem;
  }
`;

const Nickname = styled.h1`
  height: 3rem;
  font-size: 2.5rem;
  font-weight: 800;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 10rem;
    font-size: 2.2rem;
    height: 2.2rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1.8rem;
    height: 2rem;
  }
`;

const Text = styled.p`
  font-size: 1rem;
  color: #838383;

  &.intro {
    color: #000;
    margin-bottom: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;

    &.intro {
      margin-bottom: 0.5rem;
    }
  }
`;

const Button = styled.button`
  width: 15rem;
  background-color: #00a3e0;
  border-radius: 16px;
  padding: 0.9rem;
  box-sizing: border-box;
  color: #fff;
  border: none;
  font-size: 1.2rem;
  font-family: pretendard;
  cursor: pointer;

  &:hover {
    background-color: #4cb9e7;
  }

  &.reset {
    background-color: #c7c8cc;
    color: #000;

    &:hover {
      background-color: #d9d9d9;
    }
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.1rem;
    width: 15rem;
    padding: 0.7rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 9rem;
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

const Withdraw = styled.button`
  background-color: transparent;
  border: none;
  color: #838383;
  font-size: 0.85rem;
  font-family: pretendard;
  cursor: pointer;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.7rem;
  }
`;

const EditInput = styled.input`
  width: 10rem;
  height: 3rem;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #838383;
  outline: none;
  font-size: 2.5rem;
  font-weight: 800;
  font-family: pretendard;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1.8rem;
    height: 2rem;
    width: 8rem;
  }
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 2.3rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2.1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const Detail = styled.h3`
  font-size: 1.1rem;
  color: #838383;

  &.button {
    cursor: pointer;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.85rem;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    gap: 0.5rem;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    gap: 1rem;

    &.review {
      gap: 0.5rem;
      flex-direction: column;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 45rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 35rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    width: 23rem;
  }
`;

function MyPage(props) {
  const navigate = useNavigate();
  const [isEdited, setIsEdited] = useState(false);

  const dispatch = useDispatch();
  const setLogIn = (isLogIn) => dispatch(setLogin(isLogIn));
  const setProfileImg = (profileImg) => dispatch(setProfileimg(profileImg));
  const setNickname = (name) => dispatch(setName(name));

  const { id, profileImg, name } = useSelector(
    (state) => ({
      id: state.login.memberId,
      profileImg: state.login.profileImg,
      name: state.login.nickname,
    }),
    shallowEqual
  );

  const [userInfo, setUserInfo] = useState({
    nickname: name,
    profile_img: profileImg,
  });

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const reviewLists = [
    {
      place_name: '레이아웃',
      review: '정말 맛있고 사장님이 친절하세요. 정말 자주 가는 식당입니다. 항상 갈 때마다 만족해요!',
      createdAt: '2024년 4월 20일',
    },
    {
      place_name: '레이아웃',
      review: '정말 맛있고 사장님이 친절하세요. 정말 자주 가는 식당입니다. 항상 갈 때마다 만족해요!',
      createdAt: '2024년 4월 20일',
    },
    {
      place_name: '레이아웃',
      review: '정말 맛있고 사장님이 친절하세요. 정말 자주 가는 식당입니다. 항상 갈 때마다 만족해요!',
      createdAt: '2024년 4월 20일',
    },
  ];

  const [likeLists, setLikeLists] = useState([]);
  useEffect(() => {
    const getList = async () => {
      try {
        const q = query(collection(appFireStore, 'likes'), where('uid', '==', id), limit(4));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data().likedRestaurants;
          setLikeLists(data);
        });
      } catch (error) {
        console.error('쿼리 중 오류 발생:', error);
      }
    };
    getList();
  }, []);

  const handleDelete = async () => {
    try {
      if (await reAuthentication()) {
        const user = appAuth.currentUser;
        await deleteUser(user);
        const usersCollection = collection(appFireStore, 'users');
        const q = query(usersCollection, where('uid', '==', id));
        const querySnapshot = await getDocs(q);
        const userDocRef = querySnapshot.docs[0].ref;
        await deleteDoc(userDocRef);
        handleLogOut();
        Toast.fire({
          icon: 'success',
          html: '정상적으로 탈퇴되었습니다.<br>이용해주셔서 감사합니다.',
        });
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        html: '오류가 발생했습니다.',
      });
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(appAuth);
      navigate('/');
      setLogIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const reAuthentication = async () => {
    let password = '';
    try {
      const { dismiss } = await Swal.fire({
        title: '본인 인증',
        html: '비밀번호를 입력해주세요.',
        input: 'password',
        inputPlaceholder: '비밀번호',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
          password = Swal.getInput().value;
          if (!password) {
            Toast.fire({
              icon: 'error',
              html: '비밀번호를 입력해주세요.',
            });
            return false;
          }
        },
      });

      if (dismiss === Swal.DismissReason.cancel) {
        return false;
      }

      if (password) {
        const user = appAuth.currentUser;
        const email = user.email;
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential);
        return true;
      }

      return false;
    } catch (error) {
      Toast.fire({
        icon: 'error',
        html: '비밀번호가 일치하지 않습니다.',
      });
      return false;
    }
  };

  const handleReset = async () => {
    try {
      const isAuthenticated = await reAuthentication();
      if (isAuthenticated) {
        await Toast.fire({
          icon: 'success',
          html: '본인인증이 성공했습니다.<br>재설정 페이지로 이동합니다.',
        });
        navigate('/reset');
      }
    } catch (error) {
      await Toast.fire({
        icon: 'error',
        html: '본인인증에 실패했습니다.<br>',
      });
    }
  };

  const fileInput = React.createRef();
  const handleProfile = async (e) => {
    fileInput.current.click();
  };
  const handleUpload = async (e) => {
    try {
      const files = e.target.files;
      let extensionCheck = /(.*?)\.(jpg|jpeg|png)$/;
      if (!files[0].name.match(extensionCheck)) {
        Toast.fire({
          icon: 'error',
          html: '불가능한 파일 형식입니다.<br>jpg, jpeg, png만 가능합니다.',
        });
      } else if (files[0].size > 1024 ** 2 * 10) {
        Toast.fire({
          icon: 'error',
          html: '10MB 이하의 이미지만 가능합니다.',
        });
      } else if (files && files.length === 1) {
        const fileRef = ref(appStorage, `profile/${uuidv4()}`);
        await uploadBytes(fileRef, files[0]);

        const url = await getDownloadURL(ref(appStorage, fileRef));
        setModifyImg(url);
      }
    } catch (error) {
      Toast.fire({
        icon: 'error',
        html: '파일 업로드에 실패했습니다.',
      });
    }
  };

  const [modifyImg, setModifyImg] = useState(userInfo.profile_img);
  const [modifyName, setModifyName] = useState(userInfo.nickname);
  const handleUpdate = async () => {
    if (isEdited) {
      try {
        if (modifyImg === userInfo.profile_img && modifyName === userInfo.profile_img) {
          //아무것도 바뀌지 않았으면, 변경하지 않는다.
        } else {
          if (modifyName.length > 1) {
            const usersCollectionRef = collection(appFireStore, 'users');
            const q = query(usersCollectionRef, where('uid', '==', id));
            const querySnapshot = await getDocs(q);
            setUserInfo({ ...userInfo, nickname: modifyName, profile_img: modifyImg });
            setProfileImg(modifyImg);
            setNickname(modifyName);
            if (!querySnapshot.empty) {
              const userDocRef = querySnapshot.docs[0].id;
              await updateDoc(doc(appFireStore, 'users', userDocRef), {
                nickname: modifyName,
                profile_image: modifyImg,
              });
              Toast.fire({
                icon: 'success',
                html: '정상적으로 변경됐습니다.',
              });
            } else {
              Toast.fire({
                icon: 'error',
                html: '회원 정보가 없습니다.',
              });
            }
          } else {
            Toast.fire({
              icon: 'error',
              html: '닉네임은 한 글자 이상이어야 합니다.',
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleIsEdited();
  };

  const handleIsEdited = () => {
    setIsEdited(!isEdited);
    setModifyImg(userInfo.profile_img);
    setModifyName(userInfo.nickname);
  };

  return (
    <Wrapper>
      <PageContainer>
        <PorfileBox>
          <ProfileContainer>
            <ImgBox>
              {isEdited ? (
                <ProfileImg src={modifyImg === '' ? profile : modifyImg} alt="profile" />
              ) : (
                <ProfileImg src={userInfo.profile_img === '' ? profile : userInfo.profile_img} alt="profile" />
              )}
              {isEdited ? (
                <Upload onClick={handleProfile}>
                  <FaCamera size="25" color="#000" />
                  <input type="file" ref={fileInput} onChange={handleUpload} style={{ display: 'none' }} />
                </Upload>
              ) : (
                <></>
              )}
            </ImgBox>
            <InfoBox>
              <InfoBox className="name">
                {isEdited ? (
                  <EditInput
                    type="text"
                    value={modifyName || ''}
                    placeholder="닉네임"
                    onChange={(e) => setModifyName(e.target.value)}
                  />
                ) : (
                  <Nickname>{userInfo.nickname}</Nickname>
                )}
              </InfoBox>
              <Text className="intro">{userInfo.nickname}(님)의 맛집 목록 계정 입니다.</Text>
              <Button onClick={handleUpdate}>{isEdited ? '프로필 변경 적용' : '프로필 편집'}</Button>
              <Button className="reset" onClick={handleReset}>
                비밀번호 재설정
              </Button>
              <Withdraw onClick={handleDelete}>회원 탈퇴</Withdraw>
            </InfoBox>
          </ProfileContainer>
        </PorfileBox>
        <Container>
          <TitleBox>
            <Title>좋아요 목록</Title>
            <Detail className="button" onClick={() => navigate('like')}>
              더보기
            </Detail>
          </TitleBox>
          <Box>
            {likeLists.map((id) => {
              return <LikeList place_id={id} />;
            })}
          </Box>
        </Container>
        <Container>
          <TitleBox>
            <Title>최근 작성 후기</Title>
            <Detail>최대 3개까지만 확인 가능 합니다.</Detail>
          </TitleBox>
          <Box className="review">
            {reviewLists.map((reviewList) => {
              return <ReviewList reviewList={reviewList} />;
            })}
          </Box>
        </Container>
      </PageContainer>
    </Wrapper>
  );
}
export default MyPage;
