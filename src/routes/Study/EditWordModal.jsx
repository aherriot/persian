import React from 'react'

import Modal from 'components/Modal'
import WordForm from 'components/WordForm'

export default function EditWordModal({ actions, study, words }) {
  return (
    <Modal
      open={study.showEditWord}
      onClose={actions.closeEditWordModal}
      title="Edit Word">
      <WordForm
        submitAction={actions.updateWord}
        finishedSubmitAction={actions.closeEditWordModal}
        cancelAction={actions.closeEditWordModal}
        word={words.byId[study.selectedWordId]}
      />
    </Modal>
  )
}
