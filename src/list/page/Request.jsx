import React, { useEffect, useState } from 'react';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';

import RequestList from '../component/RequestList';
import Swal from 'sweetalert2';
import { appFireStore } from '../../firebase/config';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f7f6f9;
  padding: 5vh 5vw;
  box-sizing: border-box;
  margin-left: 230px;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    margin-left: 170px;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    margin-left: 0;
    padding: 4vh 5vw;
  }
`;

const Title = styled.h1`
  color: #000000;
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 0.8rem;

  &.request {
    font-size: 1.7rem;
    margin-bottom: 2rem;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 2.2rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    font-size: 2rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    font-size: 1.8rem;
  }
`;

const Detail = styled.h3`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #607274;
  line-height: 1.5;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.9rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`;

const Strong = styled.strong`
  display: block;
  font-weight: 600;
  color: #000;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const RequstBox = styled.div`
  width: 50rem;
  background-color: #fff;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 2.5rem 3rem;
  margin-bottom: 5vh;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 32rem;
    padding: 2rem;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 23.5rem;
    padding: 2rem;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 100%;
    padding: 1.2rem;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  display: block;
  margin-bottom: 0.5rem;

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (max-width: 1023px) {
    margin-bottom: 0.2rem;
  }
`;

const Input = styled.input`
  background-color: transparent;
  padding: 0.5rem 0;
  width: 44rem;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  font-family: pretendard;
  margin-bottom: 3vh;
  outline: none;
  display: block;
  font-size: 1rem;

  &::placeholder {
    color: #a49f9f;
    font-size: 0.9rem;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 20rem;
    &::placeholder {
      font-size: 0.8rem;
    }
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 20rem;
    &::placeholder {
      font-size: 0.7rem;
    }
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 100%;
    &::placeholder {
      font-size: 0.7rem;
    }
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 16px;
  background-color: #00a8dd;
  color: #fff;
  font-weight: 600;
  width: 44rem;
  box-sizing: border-box;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-family: pretendard;
  cursor: pointer;
  margin-top: 2vh;

  &:hover {
    background-color: #4cb9e7;
  }

  /* 테블릿 가로, 테블릿 세로*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 28rem;
    margin-top: 0;
  }

  /* 모바일 가로, 모바일 세로*/
  @media all and (min-width: 480px) and (max-width: 767px) {
    width: 20rem;
    margin-top: 0;
  }

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 100%;
    margin-top: 0;
  }
`;

const RequestContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70rem;
  background-color: transparent;
  gap: 2rem;
  justify-content: center;

  /* 모바일 세로*/
  @media all and (max-width: 479px) {
    width: 100%;
    gap: 1rem;
    height: 30rem;
    overflow-y: auto;
  }
`;

function Request(props) {
  const { isadmin } = useParams();

  const [request, setRequest] = useState({
    place_name: '',
    address: '',
    category: '',
  });

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });

  const [requestList, setRequestList] = useState([]);
  const [isDelete, setIsDelete] = useState(true);

  useEffect(() => {
    const getList = async () => {
      try {
        let q;
        q = query(collection(appFireStore, 'requests'));
        const querySnapshot = await getDocs(q);
        const updatedList = querySnapshot.docs.map((doc) => doc.data());
        setRequestList(updatedList);
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    };
    if (isadmin === 'admin' && isDelete) {
      getList();
      setIsDelete(false);
    }
  }, [isDelete]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequest({
      ...request,
      [name]: value,
    });
  };

  const handleRequest = async () => {
    if (request.address !== '' && request.place_name !== '') {
      try {
        let userDoc = doc(collection(appFireStore, 'requests'));
        await setDoc(userDoc, {
          request_id: uuidv4(),
          place_name: request.place_name,
          category: request.category,
          address: request.address,
        });
        Toast.fire({
          icon: 'success',
          html: '정상적으로 요청되었습니다.',
        });
        setRequest({
          place_name: '',
          address: '',
          category: '',
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          html: '오류가 발생했습니다.',
        });
      }
    } else {
      Toast.fire({
        icon: 'error',
        html: '상호명과 위치는 필수입니다.',
      });
    }
  };

  return (
    <>
      {isadmin === 'common' ? (
        <Wrapper>
          <Title>맛집 등록 요청</Title>
          <Detail>봄내음에 추가됐으면 하는 여러분들의 맛집/놀거리를 추천해주세요!</Detail>
          <RequstBox>
            <Title className="request">맛집 등록 요청</Title>
            <Label>상호명 (필수)</Label>
            <Input
              type="text"
              name="place_name"
              value={request.place_name || ''}
              placeholder="상호명을 입력해주세요."
              onChange={handleInputChange}
            />
            <Label>위치 (필수)</Label>
            <Input
              type="text"
              name="address"
              value={request.address || ''}
              placeholder="위치를 입력해주세요. (동명의 상호가 있을 수 있으므로 정확한 입력을 부탁드립니다.)"
              onChange={handleInputChange}
            />
            <Label>카테고리 (선택)</Label>
            <Input
              type="text"
              name="category"
              value={request.category || ''}
              placeholder="한식, 중식, 일식, 카페 등 자유롭게 작성해주세요."
              onChange={handleInputChange}
            />
            <Button onClick={handleRequest}>맛집 등록 요청</Button>
          </RequstBox>
          <Detail>
            <Strong>※ 신청 시 꼭 읽어주세요!</Strong>
            무분별, 중복된 등록을 방지하기 위해 신청 즉시 등록되지 않습니다. 관리자의 확인 후, 순차적으로 업로드 될
            예정입니다.
            <br />
            모든 신청이 반영되지 않을 수 있습니다. 위치 상 춘천이 아닌 곳, 홀을 운영하지 않는 배달 전용 음식점 등 목적과
            맞지 않는 경우 반영되지 않습니다.
            <br />
            봄내음은 광고성 사이트가 아닙니다. 광고, 홍보를 일절 받지 않습니다.
          </Detail>
        </Wrapper>
      ) : (
        <Wrapper>
          <Title>맛집 등록 요청</Title>
          <Detail>
            사용자의 등록 요청입니다. 업로드된 요청은 X 버튼을 눌러 제거해주세요.
            <br />
            목적에 맞지 않거나 등록 요청을 진행하지 않을 시에도 X 버튼을 눌러주세요. 모든 요청은 요청된 순으로
            제공됩니다.
          </Detail>
          <RequestContainer>
            {requestList.map((requestList) => {
              return <RequestList list={requestList} setIsDelete={setIsDelete} />;
            })}
          </RequestContainer>
        </Wrapper>
      )}
    </>
  );
}
export default Request;
