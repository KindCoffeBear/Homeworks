import styles from './Loader.module.css'

function Loader() {
  return (
    <div className={styles['lds-grid']}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Loader
