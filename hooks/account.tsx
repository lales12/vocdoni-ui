import { Component, createContext, useContext } from 'react'

export interface AccountContext extends IAppContext {
  description: string,
  email: string,
  headerFile: File,
  headerUrl: string,
  logoFile: File,
  logoUrl: string,
  name: string,
  password: string,
  setDescription?(description: string): void,
  setHeaderFile?(headerFile: File) : void,
  setHeaderUrl?(headerUrl: string) : void,
  setLogoFile?(logoFile: File) : void,
  setLogoUrl?(logoUrl: string) : void,
  setName?(name: string): void,
  setPassword?(password: string): void,
  setTerms?(checked: boolean): void,
  terms: boolean,
}

export const UseAccountContext = createContext<AccountContext>({})

export const useAccount = () => {
  const accountCtxt = useContext(UseAccountContext)
  if (accountCtxt === null) {
    throw new Error('useAccount() can only be used on the descendants of <UseAccountProvider />,')
  }

  return accountCtxt
}

export class UseAccountProvider extends Component {
  state: AccountContext = {
    email: '',
    name: '',
    description: '',
    logoUrl: '',
    headerUrl: '',
    logoFile: null,
    headerFile: null,
    password: '',
    terms: false,
  }

  setEmail(email: string) {
    this.setState({email})
  }

  setName(name: string) {
    this.setState({name})
  }

  setPassword(password: string) {
    this.setState({password})
  }

  setDescription(description: string) {
    this.setState({description})
  }

  setLogoUrl(logoUrl: string) {
    this.setState({logoUrl})
  }

  setHeaderUrl(headerUrl: string) {
    this.setState({headerUrl})
  }

  setLogoFile(logoFile: File) {
    this.setState({logoFile})
  }

  setHeaderFile(headerFile: File) {
    this.setState({headerFile})
  }

  setTerms(terms: boolean) {
    this.setState({terms})
  }

  get methods() {
    return {
      setDescription: this.setDescription.bind(this),
      setEmail: this.setEmail.bind(this),
      setName: this.setName.bind(this),
      setPassword: this.setPassword.bind(this),
      setLogoUrl: this.setLogoUrl.bind(this),
      setLogoFile: this.setLogoFile.bind(this),
      setHeaderUrl: this.setHeaderUrl.bind(this),
      setHeaderFile: this.setHeaderFile.bind(this),
      setTerms: this.setTerms.bind(this),
    }
  }

  render() {
    return (
      <UseAccountContext.Provider value={{...this.state, ...this.methods}}>
        {this.props.children}
      </UseAccountContext.Provider>
    )
  }
}
