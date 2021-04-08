import React, { ChangeEvent, useState } from 'react'
import { Checkbox } from '@aragon/ui'

import FileLoader from '../FileLoader'
import { useEntityCreation } from '../../hooks/entity-creation'
import { EntityCreationStepProps } from '../../lib/types'
import { Column, Grid } from '../grid'
import { Input, Textarea } from '../inputs'
import i18n from '../../i18n'
import { Button } from '../button'
import styled from 'styled-components'
import { SectionTitle } from '../text'
import { EntityCreationSteps } from './steps'

const FormDetails = (props: EntityCreationStepProps) => {
  const { name,
    description,
    email,
    logoFile,
    logoUrl,
    headerFile,
    headerUrl,
    methods,
    metadataValidationError
  } = useEntityCreation()
  const [terms, setTerms] = useState<boolean>(false)

  const onContinue = () => {
    methods.setStep(EntityCreationSteps.CREDENTIALS)
  }

  return (
    <Grid>
      <Column>
        <SectionTitle>{i18n.t('entity.new_entity')}</SectionTitle>
      </Column>
      <Column md={6}>
        <label htmlFor='name'>{i18n.t('entity.name')}</label>
        <Input
          wide
          id='name'
          type='text'
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            methods.setName(e.target.value)
          }
        />
      </Column>
      <Column md={6}>
        <label htmlFor='email'>{i18n.t('entity.email')}</label>
        <Input
          wide
          id='email'
          type='email'
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            methods.setEmail(e.target.value)
          }
        />
      </Column>
      <Column>
        <SectionTitle bottomMargin>{i18n.t('entity.description')}</SectionTitle>
        <div>
          <label htmlFor='edesc'>{i18n.t('entity.brief_description')}</label>
          <Textarea
            wide
            id='edesc'
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              methods.setDescription(e.target.value)
            }
          />
        </div>
      </Column>
      <Column md={6}>
        <SectionTitle>{i18n.t('entity.logo')}</SectionTitle>
        <div>
          <FileLoader
            onSelect={(file) => methods.setLogoFile(file)}
            onChange={methods.setLogoUrl}
            file={logoFile}
            url={logoUrl}
            accept='.jpg,.jpeg,.png'
          />
        </div>
      </Column>
      <Column md={6}>
        <SectionTitle>{i18n.t('entity.header')}</SectionTitle>
        <div>
          <FileLoader
            onSelect={(file) => methods.setHeaderFile(file)}
            onChange={methods.setHeaderUrl}
            file={headerFile}
            url={headerUrl}
            accept='.jpg,.jpeg,.png,.gif'
          />
        </div>
      </Column>
      <Column>
        <label>
          <Checkbox
            checked={terms}
            onChange={setTerms}
          />
          {i18n.t("entity.i_have_read_and_accept_the_privacy_policy_and_the_terms_of_service")}
        </label>
      </Column>
      <Column>
        {metadataValidationError ? <p>{metadataValidationError}</p> : null}
        <BottomDiv>
          <div />
          <Button
            positive
            onClick={onContinue}
            disabled={!!metadataValidationError || !terms}
          >
            {i18n.t("action.continue")}
          </Button>
        </BottomDiv>
      </Column>
    </Grid >
  )
}

const BottomDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`

export default FormDetails