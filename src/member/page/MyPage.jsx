import { EmailAuthProvider, deleteUser, reauthenticateWithCredential, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { appAuth, appFireStore, appStorage } from '../../firebase/config';
import { collection, deleteDoc, doc, getDocs, limit, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { setLogin, setName, setProfileimg } from '../../redux/login';
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
  height: 1150px;
  background-color: #f7f6f9;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 5vh 6vw;
  margin-left: 230px;

  @media all and (min-width: 1024px) and (max-width: 1380px) {
    margin-left: 230px;
    height: 1200px;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 170px;
    height: 1200px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    margin-left: 0;
    height: 1250px;
    padding: 3vh 2vw;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    margin-left: 0;
    height: 1000px;
    padding: 2vh 2vw;
  }
`;

const PageContainer = styled.div`
  box-sizing: border-box;
  width: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    width: 30rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 23rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 20rem;
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
  @media all and (min-width: 768px) and (max-width: 1380px) {
    width: 30rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 23rem;
    padding: 3vh 3vw;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 18rem;
    padding: 2vh 2vw;
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
  @media all and (min-width: 768px) and (max-width: 1380px) {
    gap: 1.5rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    margin-left: 0;
    gap: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
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
  @media all and (min-width: 768px) and (max-width: 1380px) {
    width: 10rem;
    height: 10rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 9rem;
    height: 9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 7rem;
    height: 7rem;
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
  font-size: 1.8rem;
  padding: 0.6rem 0.7rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    bottom: 1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 2rem;
    height: 2rem;
    bottom: 1.2rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 2rem;
    height: 2rem;
    bottom: 0.5rem;
    right: 0;
    font-size: 1.2rem;
    padding: 0.4rem 0.45rem;
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
  @media all and (min-width: 768px) and (max-width: 1380px) {
    gap: 0.3rem;
  }
  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 9rem;
    gap: 0.3rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 8rem;
    gap: 0.2rem;
  }
`;

const Nickname = styled.h1`
  height: 3rem;
  font-size: 2.5rem;
  font-weight: 800;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    width: 10rem;
    font-size: 2.2rem;
    height: 2.2rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 1.8rem;
    height: 2rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 1.6rem;
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 0.8rem;

    &.intro {
      margin-bottom: 0.5rem;
    }
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 0.6rem;

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

  &.edit {
    width: 7rem;
  }

  &.reset {
    background-color: #c7c8cc;
    color: #000;

    &:hover {
      background-color: #d9d9d9;
    }
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    font-size: 1.1rem;
    width: 15rem;
    padding: 0.7rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 9rem;
    font-size: 0.9rem;
    padding: 0.6rem;

    &.edit {
      width: 4rem;
    }
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 8rem;
    font-size: 0.7rem;
    padding: 0.4rem;

    &.edit {
      width: 3.8rem;
    }
  }
`;

const ButtonBox = styled.div`
  width: 15rem;
  display: flex;
  justify-content: space-between;

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 8rem;
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 0.7rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
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
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 1.8rem;
    height: 2rem;
    width: 8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 1.6rem;
    margin-bottom: 0.2rem;
    width: 7rem;
    height: 2rem;
  }
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 2.3rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    font-size: 2.1rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 1.8rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 1.5rem;
  }
`;

const Detail = styled.h3`
  font-size: 1.1rem;
  color: #838383;

  &.button {
    cursor: pointer;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 0.85rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 0.7rem;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    gap: 0.5rem;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  gap: 1rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1380px) {
    &.review {
      gap: 0.5rem;
      flex-direction: column;
    }
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    gap: 0.3rem;

    &.review {
      gap: 0.5rem;
      flex-direction: column;
    }
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    gap: 0.1rem;
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
  @media all and (min-width: 768px) and (max-width: 1380px) {
    width: 30rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 23rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 18rem;
  }
`;

const EmptyList = styled.div`
  font-size: 1.2rem;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  border-radius: 8px;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
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

  const [reviewList, setReviewList] = useState([]);
  const [likeLists, setLikeLists] = useState([]);
  const [isDelete, setIsDelete] = useState(true);

  useEffect(() => {
    const getList = async () => {
      try {
        const q = query(collection(appFireStore, 'likes'), where('uid', '==', id), limit(3));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data().likedRestaurants.slice(0, 3);
          setLikeLists(data);
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    getList();
  }, []);

  useEffect(() => {
    const getReview = async () => {
      try {
        const q = query(
          collection(appFireStore, 'reviews'),
          where('uid', '==', id),
          orderBy('created_at', 'desc'), // created_at 필드를 내림차순으로 정렬
          limit(3)
        );
        const querySnapshot = await getDocs(q);

        const reviews = [];
        querySnapshot.forEach((doc) => {
          let review = {
            writer: doc.data().writer,
            content: doc.data().content,
            created_at: doc.data().created_at.toDate().toISOString().substring(0, 10),
            place_name: doc.data().place_name,
            place_id: doc.data().place_id,
            review_id: doc.data().review_id,
          };
          reviews.push(review);
        });
        setReviewList(reviews);
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    if (isDelete) {
      getReview();
      setIsDelete(false);
    }
  }, [isDelete]);

  const handleDelete = async () => {
    if (id !== 'nNmBOFPqsTOGnHZcJVptNpBdTwu2') {
      try {
        if (await reAuthentication()) {
          const user = appAuth.currentUser;
          await deleteUser(user);
          let userCollection = collection(appFireStore, 'users');
          let q = query(userCollection, where('uid', '==', id));
          let querySnapshot = await getDocs(q);
          let userDocRef = querySnapshot.docs[0].ref;
          await deleteDoc(userDocRef);
          userCollection = collection(appFireStore, 'likes');
          q = query(userCollection, where('uid', '==', id));
          querySnapshot = await getDocs(q);
          userDocRef = querySnapshot.docs[0].ref;
          await deleteDoc(userDocRef);
          handleLogOut();
          Toast.fire({
            icon: 'success',
            html: '정상적으로 탈퇴되었습니다.<br>이용해주셔서 감사합니다.',
          });
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    } else {
      Toast.fire({
        icon: 'error',
        html: '테스트계정은 이용할 수 없는 기능입니다.',
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
    if (id !== 'nNmBOFPqsTOGnHZcJVptNpBdTwu2') {
      let password = '';
      try {
        const { dismiss } = await Swal.fire({
          title: '본인 인증',
          html: '현재 비밀번호를 입력해주세요.',
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
        console.log(error);
        Toast.fire({
          icon: 'error',
          html: '비밀번호가 일치하지 않습니다.',
        });
        return false;
      }
    } else {
      Toast.fire({
        icon: 'error',
        html: '테스트계정은 이용할 수 없는 기능입니다.',
      });
    }
  };

  const handleReset = async () => {
    if (id !== 'nNmBOFPqsTOGnHZcJVptNpBdTwu2') {
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
    } else {
      Toast.fire({
        icon: 'error',
        html: '테스트계정은 이용할 수 없는 기능입니다.',
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
          if (modifyName.length > 1 && modifyName.length <= 6) {
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
              html: '닉네임은 1글자 이상<br> 6글자 이하만 가능 합니다.',
            });
          }
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    }
    handleIsEdited();
  };

  const handleIsEdited = () => {
    setIsEdited(!isEdited);
    setModifyImg(userInfo.profile_img);
    setModifyName(userInfo.nickname);
  };

  const handleCancel = () => {
    setIsEdited(!isEdited);
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
                  <FaCamera color="#000" />
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
              {isEdited ? (
                <ButtonBox>
                  <Button className="edit" onClick={handleUpdate}>
                    변경
                  </Button>
                  <Button className="edit" onClick={handleCancel}>
                    취소
                  </Button>
                </ButtonBox>
              ) : (
                <Button onClick={handleUpdate}>프로필 편집</Button>
              )}
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
          {likeLists.length !== 0 ? (
            <Box>
              {likeLists.map((id) => {
                return <LikeList place_id={id} />;
              })}
            </Box>
          ) : (
            <EmptyList>좋아요한 맛집이 없습니다.</EmptyList>
          )}
        </Container>
        <Container>
          <TitleBox>
            <Title>작성 후기</Title>
            <Detail>최근 작성된 3개의 후기만 확인 가능합니다.</Detail>
          </TitleBox>
          {reviewList.length !== 0 ? (
            <Box className="review">
              {reviewList.map((reviewList) => {
                return <ReviewList reviewList={reviewList} setIsDelete={setIsDelete} />;
              })}
            </Box>
          ) : (
            <EmptyList>작성하신 후기가 없습니다.</EmptyList>
          )}
        </Container>
      </PageContainer>
    </Wrapper>
  );
}
export default MyPage;
