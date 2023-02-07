import { Avatar, Stack, Typography } from "@mui/material"
import { useWeb3React } from "@web3-react/core";

function Profile() {

  const { account } = useWeb3React()  

  return (
      <Stack direction="row" spacing={1} alignItems="center" sx={{ p: 0.5, }}>
          <Avatar alt="profile user" src={'/avatar.jpg'} sx={{ width: 34, height: 34 }} />
          <Typography variant="subtitle1">{(account as string).slice(0,4) + '...'+ (account as string).slice(-4)}</Typography>
      </Stack>
  )
}

export default Profile