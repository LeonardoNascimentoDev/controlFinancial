import React, { useState, useEffect } from 'react';

import { Input } from '../../../../components/Input/styled';
import { Text } from '../../../../components/Text/styled';
import { Button } from '../../../../components/Button/styled';

import { POST, PUT, DELETE } from '../../../../services'

import { 
  Backdrop,  
  Modal,
  ContainerModal,
  ModalContainer,
  InputWrapper,
  ModalHeader,
  ModalFooter,
  Error,
  ButtonEdit,
  ButtonDelete,
} from './styled';

const ModalCrud = ({
  type,
  handleClose,
  dataTransaction,
  handleType
}) => {
  const [empresaDetail, setEmpresaDetail] = useState({
    name: dataTransaction?.name,
    documentNumber: dataTransaction?.documentNumber,
    income: dataTransaction?.income,
    outflow: dataTransaction?.outflow,
    description: dataTransaction?.description
  });

  const [errorSubmit, setErrorSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fieldName, setFieldName] = useState('');
  const [fieldDocumentNumber, setFieldDocumentNumber] = useState('');
  const [fieldIncome, setFieldIncome] = useState('');
  const [fieldOutflow, setFieldOutflow] = useState('');
  const [fieldDescription, setFieldDescription] = useState('');

  useEffect(() => {
    if (type === 'create') {
      // ...
    } else if (type === 'edit' || type === 'read') {
      setFieldName(empresaDetail.name);
      setFieldDocumentNumber(empresaDetail.documentNumber);
      setFieldIncome(empresaDetail.income);
      setFieldOutflow(empresaDetail.outflow);
      setFieldDescription(empresaDetail.description);
    } else if (type === 'delete') {
      // ...
    } else {
      console.log('TYPE MODAL CRUDO NOT DEFINED.');
    }
  }, [type])

  const handleSubmitConfirm = async () => {
    try {
      if (
        !fieldName
        || !fieldDocumentNumber
        || !fieldIncome
        || !fieldOutflow
        || !fieldDescription
      ) {
        setErrorSubmit(true);
        return false;
      }

      setLoading(true);

      const dataPayload = {
        name: fieldName,
        documentNumber: fieldDocumentNumber,
        income: fieldIncome,
        outflow: fieldOutflow,
        description: fieldDescription,
      }
      console.log('handleSubmitConfirm dataPayload:', dataPayload);

      // const response = null;
      if (type === 'create') {
        const response = await POST('api/v1/transaction', dataPayload);
        console.log('handleSubmitConfirm response:', response);  

        if (response?.status === 200) {
          handleClose(true, 'Empresa criada com sucesso!');
        }
      } else if (type === 'edit') {
        const response = await PUT(`api/v1/transaction-update/${dataTransaction._id}`, dataPayload);
        console.log('handleSubmitConfirm response:', response);

        if (response?.status === 200) {
          handleClose(true, 'Empresa editada com sucesso!');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    try {
      const { value, name } = e?.target || {}

      switch (name) {
        case 'name':
          setFieldName(value);
          break;
        case 'documentNumber':
          setFieldDocumentNumber(value);
          break;
        case 'income':
          setFieldIncome(value);
          break;
        case 'outflow':
          setFieldOutflow(value);
          break;
        case 'description':
          setFieldDescription(value);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [canDelete, setCanDelete] = useState(false);
  const handleDelete = async () => {
    try {
      setCanDelete(true);
      setTimeout(() => setCanDelete(false), 3000);

      if (canDelete) {
        setLoading(true);
        const response = await DELETE(`api/v1/transaction/${dataTransaction._id}`);
        console.log('handleDelete response:', response);

        if (response?.status === 200) {
          handleClose(true, 'Transação deletada com sucesso!');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Backdrop />
      <ContainerModal>
        <Modal>
          <ModalContainer>
            <ModalHeader>
              {type === 'read' && (<ButtonEdit disabled={loading} onClick={() => handleType('edit')}>Editar Dados</ButtonEdit>)}
              {dataTransaction?._id && (<ButtonDelete disabled={loading} onClick={() => handleDelete()}>{!canDelete ? 'Deletar' : 'Click para Confirmar!'}</ButtonDelete>)}
            </ModalHeader>
            <InputWrapper>
              <Input disabled={(type === 'read')} placeholder="Nome" name="name" value={fieldName} onChange={handleChange} className={((type === 'create' || type === 'edit') && !fieldName && errorSubmit) ? 'error' : ''} />
            </InputWrapper>
            <InputWrapper>
              <Input disabled={(type === 'read')} placeholder="CPF" name="documentNumber" value={fieldDocumentNumber} onChange={handleChange} className={((type === 'create' || type === 'edit') && !fieldDocumentNumber && errorSubmit) ? 'error' : ''} />
            </InputWrapper>
            <InputWrapper>
              <Input disabled={(type === 'read')} placeholder="Entrada" name="income" value={fieldIncome} onChange={handleChange} className={((type === 'create' || type === 'edit') && !fieldIncome && errorSubmit) ? 'error' : ''} />
            </InputWrapper>
            <InputWrapper>
              <Input disabled={(type === 'read')} placeholder="Saída" name="outflow" value={fieldOutflow} onChange={handleChange} className={((type === 'create' || type === 'edit') && !fieldOutflow && errorSubmit) ? 'error' : ''} />
            </InputWrapper>
            <InputWrapper>
              <Text disabled={(type === 'read')} placeholder="Descrição" name="description" value={fieldDescription} onChange={handleChange} className={((type === 'create' || type === 'edit') && !fieldDescription && errorSubmit) ? 'error' : ''} />
            </InputWrapper>
            {errorSubmit && (<Error>Preencha os campos!</Error>)}
            <ModalFooter>
              <Button onClick={handleClose}>{type !== 'view' ? 'Cancelar' : 'Fechar'}</Button>
              {type === 'create' && (<Button disabled={loading} onClick={handleSubmitConfirm}>Cadastrar</Button>)}
              {type === 'edit' && (<Button disabled={loading} onClick={handleSubmitConfirm}>Editar</Button>)}
            </ModalFooter>
          </ModalContainer>
        </Modal>
      </ContainerModal>
    </>
  )
}

export default ModalCrud;