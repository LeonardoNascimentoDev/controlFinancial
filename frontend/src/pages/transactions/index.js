import React, { useEffect, useState } from 'react';

import { Page } from '../../components/Page/styled';
import { Container } from '../../components/Container/styled';
import { Button } from '../../components/Button/styled';
import { useHistory } from 'react-router-dom';

import { 
  Header, 
  Body, 
  BodyHeader, 
  HeaderColLeft,
  HeaderColCenter,
  HeaderColRight, 
  Brand, 
  Search,
  Profile,
  ProfileAvatar,
  ProfileUser,
  BodyHeaderColLefth,
  BodyHeaderColRight,
  BodyHeaderTitle,
  ContainerTransacoesList,
  ContainerTransacoesListWrapper,
  ContentTransacoesListWrapper,
  ContainerTransacoesListWrapperFoto,
  ContainerTransacoesListWrapperHeader,
  ContainerTransacoesListWrapperBody,
  ContainerTransacoesListWrapperTitle,
  ContainerTransacoesListWrapperSobre,
  Message,
  Paginate,
  PaginateItem,
  ResultSearch,
  ResultSearchTitle,
  ResultSearchSobre
} from './styled';

import ModalCrud from './components/ModalCrud';
import { GET } from '../../services';

const TransacoesPage = () => {

  const username = JSON.parse(sessionStorage.getItem('username'))

  const history = useHistory();
  function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return tokenString;
  }

  const token = getToken();

  if(!token) {
      history.push('/login')          
  }

  const [searchValue, setSearchValue] = useState(null);
  const [resultSearch, setResultSearch] = useState(null);
  const handleSearch = async () => {
    try {
      console.log('handleSearch target...');
      if (searchValue) {
        const response = await GET(`api/v1/transaction-search/${searchValue}`);
        const responseResult = await response.json();
        console.log('handleSearch responseResult:', responseResult);
        setResultSearch(responseResult);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (searchValue) handleSearch();
  }, [searchValue])

  const [paginate, setPaginate] = useState(null);
  const [TransacoesList, setTransacoesList] = useState([]);
  const [transacoesResponse, setTransacoesResponse] = useState([]);

  const perPage = 10;

  const handleGetTransactions = async () => {
    try {
      const response = await GET('api/v1/transactions');
      console.log('handleGetTransactions response:', response);
      const responseResolved = await response.json();
      console.log('handleGetTransactions responseResolved:', responseResolved);
      setTransacoesResponse(responseResolved);

      if (responseResolved?.length) {
        // Resolve a paginação
        const currentPage = 1;
        const numPages = Math.ceil(responseResolved.length / perPage);
        console.log('handleGetTransactions numPages:', numPages);
        const pages = []
        console.log('handleGetTransactions pages:', pages);

        for (let index = 1; index < numPages; index++) {
          pages.push({text: index});
        }

        const init = 0; // currentPage * perPage;
        const end = init + perPage
        console.log('handleGetTransactions init:', init);
        console.log('handleGetTransactions end:', end);
        const result = responseResolved.slice(init, end);
        console.log('handleGetTransactions result:', result);

        setPaginate({
          pages,
          currentPage
        });

        // Set resultado inicial
        setTransacoesList(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetTransactions();
  }, []);

  const [viewModalCrud, setViewModalCrud] = useState(false);
  const [typeModalCrud, setTypeModalCrud] = useState(null);
  const [dataTransaction, setDataTransaction] = useState(null);
  const handleOpenModalCrud = (type, empresa) => {
    setViewModalCrud(true);
    setTypeModalCrud(type);
    if (empresa) setDataTransaction(empresa);
  }

  const [message, setMessage] = useState(null);
  const handleCloseModalCrud = (refresh, messageCrud) => {
    setViewModalCrud(false);
    setTypeModalCrud(null);

    if (messageCrud) {
      setMessage(messageCrud);
      setTimeout(() => setMessage(null), 3000);
      window.scrollTo(0, 0);
    }

    if (refresh) handleGetTransactions();
  }

  const handlePaginate = (page) => {
    try {
      console.log('handlePaginate paginate:', paginate);
      const init = page * perPage;
      const end = init + perPage
      console.log('handleGetTransactions init:', init);
      console.log('handleGetTransactions end:', end);
      const result = transacoesResponse.slice(init, end);
      console.log('handleGetTransactions result:', result);

      setPaginate({
        ...paginate,
        currentPage: page
      })

        // Set resultado inicial
        setTransacoesList(result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleExitSession = () => {
    sessionStorage.clear();
    history.push('/login')          
  }

  /**
   * Render
  */

  return (
    <Page>
      <Container>
        <Header>
          <HeaderColLeft>
            <Brand src="http://localhost:3000/logo192.png" alt="Brand" />
          </HeaderColLeft>
          <HeaderColCenter>
            <Search placeholder="Pesquisar..." onChange={(e) => setSearchValue(e?.target?.value)}/>
            {resultSearch && (
              <ResultSearch onClick={() => handleOpenModalCrud('read', resultSearch)}>
                <ResultSearchTitle>{resultSearch?.name}</ResultSearchTitle>
                <ResultSearchSobre>{resultSearch?.description}</ResultSearchSobre>
              </ResultSearch>
            )}
          </HeaderColCenter>
          <HeaderColRight>
             <Profile>
              <ProfileAvatar src="http://localhost:3000/logo192.png" alt="Profile user avatar" />
              <ProfileUser>{username }</ProfileUser>
             </Profile>
             <BodyHeaderColRight>
              <Button onClick={() => handleExitSession()}>Sair</Button>
            </BodyHeaderColRight>
          </HeaderColRight>
        </Header>
        <Body>
          <BodyHeader>
            <BodyHeaderColLefth>
              <BodyHeaderTitle>Transações</BodyHeaderTitle>
            </BodyHeaderColLefth>
            <BodyHeaderColRight>
              <Button onClick={() => handleOpenModalCrud('create')}>ADICIONAR</Button>
            </BodyHeaderColRight>
          </BodyHeader>

          {message && (<Message>{message}</Message>)}
          
          <ContainerTransacoesList>
            {TransacoesList.map((empresa, i) => (
              <ContainerTransacoesListWrapper key={String(i)} onClick={() => handleOpenModalCrud('read', empresa)}>
                <ContentTransacoesListWrapper>
                  <ContainerTransacoesListWrapperHeader>
                    <ContainerTransacoesListWrapperFoto src={'transaction-default.png'} />
                  </ContainerTransacoesListWrapperHeader>
                  <ContainerTransacoesListWrapperBody>
                    <ContainerTransacoesListWrapperTitle>{empresa.name}</ContainerTransacoesListWrapperTitle>
                    <ContainerTransacoesListWrapperSobre>{empresa.description}</ContainerTransacoesListWrapperSobre>
                  </ContainerTransacoesListWrapperBody>
                  </ContentTransacoesListWrapper>
              </ContainerTransacoesListWrapper>
            ))}
          </ContainerTransacoesList>
        </Body>

        {!!paginate?.pages?.length && (
          <Paginate className='paginate'>
            {paginate.pages.map((item, i) => (
              <PaginateItem key={i} className={paginate.currentPage === item.text ? 'selected' : ''} onClick={() => handlePaginate(item.text)}>{item.text}</PaginateItem>
            ))}
          </Paginate>
        )}
      </Container>

      {viewModalCrud && (
        <ModalCrud 
          type={typeModalCrud}
          handleType={setTypeModalCrud}
          handleClose={handleCloseModalCrud}
          dataTransaction={dataTransaction}
          />
      )}
    </Page>
  )
}

export default TransacoesPage;