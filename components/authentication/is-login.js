/**
 *  In this file we are using iron-session type login 
 *  this is a low-level, encrypted and stateless session patterns.
 *  see : https://nextjs.org/docs/authentication#bring-your-own-database
 * 
 *  Copyright : @hadramet 2022.
 */

import { Alert, Box, Button, FormHelperText, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import * as Yup from 'yup'
import useSession from "../../lib/useSession"
import fetchJson from '../../lib/fetchJson'

// formik : https://www.npmjs.com/package/formik
// yup : https://www.npmjs.com/package/yup

export const ISLogin = (props) => {
    const router = useRouter();
    const returnUrl = router.query.returnUrl || '/app';
    const { mutateUser } = useSession({ redirectTo: returnUrl, redirectIfFound: true })

    const loginForm = useFormik({
        initialValues: {
            email: 'admin@scoosign.cm',
            password: 'Supinf0',
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            password: Yup
                .string()
                .max(255)
                .required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
            // Do something
            console.log(`email : ${values.email}, password: ${values.password}`)
            try {

                mutateUser(await fetchJson(
                    '/api/authentication/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                    })
                }))
            } catch (error) {

                console.error(error);
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: error.info.message });
                helpers.setSubmitting(false);
            }
        }
    })

    return (
        <form noValidate onSubmit={loginForm.handleSubmit}{...props}>
            <TextField autoFocus error={Boolean(loginForm.touched.email && loginForm.errors.email)}
                fullWidth helperText={loginForm.touched.email && loginForm.errors.email}
                label="Email Address"
                name="email"
                onBlur={loginForm.handleBlur}
                onChange={loginForm.handleChange}
                type="email" value={loginForm.values.email} margin="normal" />
            <TextField autoFocus error={Boolean(loginForm.touched.password && loginForm.errors.password)}
                fullWidth helperText={loginForm.touched.password && loginForm.errors.password}
                label="Password"
                name="password"
                onBlur={loginForm.handleBlur}
                onChange={loginForm.handleChange}
                type="password" value={loginForm.values.password} margin="normal" />

            {
                loginForm.errors.submit && (
                    <Box sx={{ mt: 3 }}>
                        <FormHelperText error>{loginForm.errors.submit}</FormHelperText>
                    </Box>
                )
            }

            <Box sx={{ mt: 2 }}>
                <Button disabled={loginForm.isSubmitting} fullWidth
                    size='large' type='submit' variant='contained'>
                    Log In
                </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Alert severity="info">
                    <Typography variant='caption' >
                        <div> <b>Admin :</b>{' '} Use {' '} <b>admin@scoosign.com</b> {' '} and password {' '} <b>Supinf0</b> </div>
                        <div> <b>Academic :</b>{' '} Use {' '} <b>aca@scoosign.com</b> {' '} and password {' '} <b>Supinf1</b> </div>
                        <div> <b>Student :</b>{' '} Use {' '} <b>student@scoosign.com</b> {' '} and password {' '} <b>Supinf2</b> </div>
                        <div> <b>Teacher :</b>{' '} Use {' '} <b>teach.math@scoosign.com</b> {' '} and password {' '} <b>Supinf3</b> </div>
                        <div> <b>Parent :</b>{' '} Use {' '} <b>momanddad@scoosign.com</b> {' '} and password {' '} <b>Supinf4</b> </div>
                    </Typography>
                </Alert>
            </Box>
        </form>
    )
}