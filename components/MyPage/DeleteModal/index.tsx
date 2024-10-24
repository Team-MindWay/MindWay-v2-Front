import { Portal } from '@/components';
import { ModalPropsType } from '@/types';
import * as S from './style';
import useFetch from '@/hooks/useFetch';

const DeleteModal = ({ item, onClose }: ModalPropsType) => {
  const { fetch } = useFetch({
    url: `/order/${item.id}`,
    method: 'DELETE',
    successMessage: '신청 도서 삭제가 완료되었어요!',
    failureMessage: '신청 도서 삭제가 실패했어요!',
  });

  const onConfirm = async () => {
    await fetch();
    onClose();
  };

  return (
    <Portal onClose={onClose}>
      <S.Wrapper>
        <S.TextContainer>
          <S.CautionText>
            신청하신 도서를 <span>삭제</span>하시겠습니까?
          </S.CautionText>
          <S.TitleTextContainer>
            <S.TitleText>{item.title}</S.TitleText>
          </S.TitleTextContainer>
        </S.TextContainer>
        <S.ButtonContainer>
          <S.CancleButton onClick={onClose}>취소</S.CancleButton>
          <S.CheckButton onClick={onConfirm}>확인</S.CheckButton>
        </S.ButtonContainer>
      </S.Wrapper>
    </Portal>
  );
};

export default DeleteModal;
