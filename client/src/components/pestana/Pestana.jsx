import React from 'react'

import {Tabs, Tab, TabPanel, TabList} from '../../lib'
import CustomTab from './CustomTab'

class CustomTabExample extends React.Component {
    constructor () {
        super()
        this.state = {activeTab: 'about'}
    }
    render () {
        const {activeTab} = this.state
        return (
            <div>

                <Tabs activeTab={activeTab}>
                    <TabList className='text-center bg-light indent-bottom--medium'>
                        <Tab component={CustomTab} label='Update Product' id='info'/>
                        <Tab component={CustomTab} label='Delete Product' id='about'/>
                    </TabList>
                    <TabList>
                        <TabPanel component={() => <div>
                            Update Here
                                <div>
                                   
                                    <p>Product Price Stock Color</p>
                                    
                                </div>
                            </div>}
                                                    
                        id='info'/>
                        
                        <TabPanel component={() => <div>
                            Delete Here
                            <div>

                                    <p>Producto para borrar</p>

                            </div>
                            </div>}
                             id='about'/>
                    </TabList>
                </Tabs>
            </div>
        )
    }
}

export default CustomTabExample

/*
const Pestana = () => {
  
  return (
     <div><h1>Pestaña</h1></div>
  )
}
  
export default Pestana;
*/