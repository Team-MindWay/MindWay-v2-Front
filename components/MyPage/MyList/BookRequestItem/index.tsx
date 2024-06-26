import { DeleteButtonIcon, EditButtonIcon } from '@/asset';
import * as S from './style';
import { useState } from 'react';
import DeleteModal from '../../DeleteModal';
import EditModal from '../../EditModal';
import { BookInfoType } from '@/types';

const BookRequestItem = ({ id, title, author, book_url }: BookInfoType) => {
  const [isShow, setIsShow] = useState<string>('none');
  const bookData = {
    id: id,
    title: title,
    author: author,
    book_url: book_url,
  };

  return (
    <>
      <S.BookRequestItem>
        <S.BookTextContainer>
          <S.TitleText>{title}</S.TitleText>
          <S.AuthorText>{author}</S.AuthorText>
        </S.BookTextContainer>
        <S.ToolBox>
          <S.ToolButton onClick={() => setIsShow('edit')}>
            <EditButtonIcon />
          </S.ToolButton>
          <S.ToolButton onClick={() => setIsShow('delete')}>
            <DeleteButtonIcon />
          </S.ToolButton>
        </S.ToolBox>
      </S.BookRequestItem>
      {isShow === 'edit' && (
        <EditModal item={bookData} onClose={() => setIsShow('')} />
      )}
      {isShow === 'delete' && (
        <DeleteModal item={bookData} onClose={() => setIsShow('')} />
      )}
    </>
  );
};

export default BookRequestItem;
