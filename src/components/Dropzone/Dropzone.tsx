import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import './styles.css'

interface Props {
  onFileUplouded: (file: File) => void
}

const Dropzone: React.FC<Props> = ({ onFileUplouded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback((acceptedFiles: any[]) => {
   const file = acceptedFiles[0]
   const imageConvert = new Blob([file], {type: 'image'})

   const fileUrl = URL.createObjectURL(imageConvert)

   setSelectedFileUrl(fileUrl)
   onFileUplouded(file)
  }, [onFileUplouded])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { accepted: ['image/*'] }
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      { selectedFileUrl
        ? <img src={selectedFileUrl} alt="Point thumbnail" />
        : (
          <p>
            <FiUpload />
            Imagem do estabelecimento
          </p>
        )
      }  
    </div>
  )
}

export default Dropzone