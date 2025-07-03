import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { useState } from "react"

const NavBar = () => {

    const [productCategories,setProductCategories] = useState(['Laptops','Smartphones', 'Cameras','Accessories', 'Gaming','Wearables','Printers'])

    const [selectedCategory, setSelectedCategory] = useState<string | null>(productCategories[0]);

  return(

      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', px: 3 ,borderBottom:'2px solid #bdbdbd'}}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '48px !important' }}>
     
        {/* Center - Category Items */}
        <Box display="flex" gap={3}>
          {productCategories.map((category) => (
            <Box
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              <span className="category-underline" />
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
    
}

export default NavBar;