import React from 'react'

import Modal from 'components/Modal'
import WordForm from 'components/WordForm'

export default function EditWordModal({ actions, study, words, isAdmin }) {
  return (
    <Modal
      open={study.showEditWord}
      onClose={actions.closeEditWordModal}
      title={isAdmin ? 'Edit Word' : 'Suggest Edit'}>
      <WordForm
        submitAction={isAdmin ? actions.updateWord : actions.addSuggestion}
        finishedSubmitAction={actions.closeEditWordModal}
        cancelAction={actions.closeEditWordModal}
        word={words.byId[study.selectedWordId]}
        isAdmin={isAdmin}
      />
    </Modal>
  )
}
