import React, { useState, useEffect } from 'react'
import classes from './Main.module.css'
import FolderTree from './FolderTree'
import FileUpload from '../features/FileUpload'
import CreateUser from '../features/CreateUser'
import Posts from '../features/Posts'
import Nav from './Nav'
import Loader from './Loader'
//Main app display window. Parent to upload & navigation features
//Controls all file related states and passes to both features the ones they need

const Main = ({ user, role }) => {
  const [uploadPath, setUploadPath] = useState({
    customerFolder: '',
    subFolder: ''
  })
  const [folderPath, setFolderPath] = useState({
    customerFolder: '',
    subFolder: ''
  })

  const [shUp, setShUp] = useState(false)
  const [shNv, setShNv] = useState(false)
  const [shCrtUsr, setShCrtUsr] = useState(false)
  const [shCrtPst, setShCrtPst] = useState(false)
  const [shCrtNws, setShCrtNws] = useState(false)
  const [shDltUsr, setShDltUsr] = useState(false)

  const [files, setFiles] = useState([])
  const [folders, setFolders] = useState([])
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setUploadPath({ customerFolder: user, subFolder: 'Month' })
    setFolderPath({ customerFolder: user, subFolder: '' })
  }, [user])

  useEffect(() => {
    setShUp(false)
    setShNv(false)
  }, [user])

  console.log(role)
  return (
    <>
      <Nav
        user={user}
        role={role}
        shUp={shUp}
        setShUp={setShUp}
        shNv={shNv}
        setShNv={setShNv}
        shCrtUsr={shCrtUsr}
        setShCrtUsr={setShCrtUsr}
        shCrPst={shCrtPst}
        setShCrtPst={setShCrtPst}
        shCrNws={shCrtNws}
        setShCrtNws={setShCrtNws}
        shDltUsr={shDltUsr}
        setShDltUsr={setShDltUsr}
      />

      <main className={classes.mainContainer}>
        <div className={classes.display}>
          {shUp && (
            <FileUpload
              setLoading={setLoading}
              file={file}
              setFile={setFile}
              uploadPath={uploadPath}
              setFiles={setFiles}
              setFolders={setFolders}
              folderPath={folderPath}
            />
          )}

          {shNv && (
            <FolderTree
              setLoading={setLoading}
              role={role}
              files={files}
              setFiles={setFiles}
              folders={folders}
              setFolders={setFolders}
              folderPath={folderPath}
              setFolderPath={setFolderPath}
            />
          )}

          {user === 'Admin' && shCrtUsr && (
            <CreateUser setLoading={setLoading} />
          )}

          {/* //TODO: SHOULD BE CreatePost */}
          {user === 'Admin' && shCrtPst && (
            <Posts role={role} setLoading={setLoading} />
          )}
        </div>
        <div className={classes.loader}>{loading && <Loader />}</div>
      </main>
    </>
  )
}

export default Main
