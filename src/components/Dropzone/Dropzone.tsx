import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'
import './styles.css'

interface Props {
  onFileUplouded: (file: string) => void
}

const Dropzone: React.FC<Props> = ({ onFileUplouded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback((acceptedFiles: any) => {
    const reader = new FileReader()
    const imageConvert = new Blob([acceptedFiles[0]], { type: 'image' })
    const imageConvertToBase64 = reader.readAsDataURL(imageConvert)
    let baseURL: any
    reader.onload = () => {
      baseURL = reader.result
      onFileUplouded(baseURL)
    }

    const fileUrl = URL.createObjectURL(imageConvert)
    setSelectedFileUrl(fileUrl)
  }, [onFileUplouded])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { accepted: ['image/*'] }
  })

  console.log(selectedFileUrl);
  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl
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