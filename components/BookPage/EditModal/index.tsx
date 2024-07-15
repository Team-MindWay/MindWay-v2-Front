import { Portal } from '@/components';
import { ModalPropsType, RecommendType } from '@/types';
import * as S from './style';
import Xmark from '@/asset/svg/Xmark';
import Input from '@/components/common/Input';
import { useForm } from 'react-hook-form';
import { RecommendBookType } from '@/types/components/BookInfoType';
import { instance } from '@/apis';
import { toast } from 'react-toastify';
import toastOption from '@/lib/toastOption';
import { ErrorIcon, SuccessIcon } from '@/asset';

const EditModal = ({ onClose, editItem }: ModalPropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecommendBookType>({
    defaultValues: {
      title: editItem.title,
      author: editItem.author,
      content: editItem.content,
    },
  });

  const EditBook = async (data: RecommendBookType) => {
    try {
      await instance.patch(`/recommend/${editItem.id}`, {
        title: data.title,
        content: data.content,
        author: data.author,
      });
      toast.success('추천 도서 등록이 완료되었어요!', {
        ...toastOption,
        icon: <SuccessIcon />,
      });
      console.log(data);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error('추천 도서 등록에 실패했어요', {
        ...toastOption,
        icon: <ErrorIcon />,
      });
    }
  };

  return (
    <Portal onClose={onClose}>
      <S.Wrapper onSubmit={handleSubmit(EditBook)}>
        <S.ContentContainer>
          <S.HeaderContainer>
            <S.TitleText>추천 도서 수정</S.TitleText>
            <S.XmarkContainer onClick={onClose}>
              <Xmark />
            </S.XmarkContainer>
          </S.HeaderContainer>
          <S.InputContainer>
            <Input
              label='제목'
              placeholder='책 제목을 입력해주세요.'
              error={!!errors.title}
              errorMessage='책 제목을 입력해주세요'
              register={register('title', {
                required: true,
              })}
            />
            <Input
              label='내용'
              placeholder='내용을 입력해주세요.'
              error={!!errors.author}
              errorMessage='내용을 입력해주세요'
              register={register('content', {
                required: true,
              })}
            />
            <Input
              label='저자'
              placeholder='저자를 입력해주세요.'
              error={!!errors.content}
              errorMessage='저자를 입력해주세요'
              register={register('author', {
                required: true,
              })}
            />
          </S.InputContainer>
        </S.ContentContainer>
        <S.CancleButton type='submit'>등록하기</S.CancleButton>
      </S.Wrapper>
    </Portal>
  );
};

export default EditModal;