import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import { useHistory } from 'react-router-dom';

import { AdminRoutePaths } from '@core/enums';
import { ImageUpload } from '@features/imageUpload';
import { Input } from '@shared/components/formСomponents/input';
import { Card } from '@shared/components/card';
import { useApi } from '@shared/hooks';

import { AuthorAutocomplete } from './components/authorAutocomplete';
import { GenresMultiAutocomplete } from './components/genresMultiAutocomplete';
import { STYLES, FORM_INITIAL_VALUE, VALIDATION_SCHEMA } from './constants';
import { IBookForm } from './interfaces';

export const BookForm = () => {
  const history = useHistory();
  const api = useApi();

  const handleSubmit = async (values: IBookForm, {setSubmitting}: FormikHelpers<IBookForm>) => {
    if(values.imageFile) {
      const formData = new FormData();
      formData.append('image', values.imageFile);

      values.imageUrl = await(await api.saveImage(formData));
    }

    await api.addBook(values);
    navigateToBooksPage();
    setSubmitting(false);
  }

  const formik = useFormik({
    initialValues: FORM_INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: handleSubmit
  });

  const navigateToBooksPage = () => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS}`);
  }

  return <Card>
    <Box sx={STYLES.page}>
      <Typography
        variant='h5'
        gutterBottom
        component='div'
        sx={STYLES.pageHeader}>
        Add new book
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Input
          id={'title'}
          label={'Title'}
          fieldName={'title'}
          form={formik}
          styles={STYLES.titleInput}/>

        <Box sx={STYLES.authorWrapper}>
          <AuthorAutocomplete form={formik} fieldName={'author'}/>
        </Box>

        <Box sx={STYLES.rowWrapper}>
          <Input
            id={'amountPages'}
            label={'Amount of pages'}
            fieldName={'amountPages'}
            form={formik}
            styles={STYLES.amountPagesInput}/>

          <Input
            id={'year'}
            label={'Year'}
            fieldName={'year'}
            form={formik}
            styles={STYLES.yearInput}/>
        </Box>

        <Box sx={STYLES.genresWrapper}>
          <GenresMultiAutocomplete form={formik} fieldName={'genres'}/>
        </Box>

        <Box sx={STYLES.imageWrapper}>
          <ImageUpload
            alt={`Book's cover`}
            form={formik}
            imageUrlFieldName={'imageUrl'}
            imageFileFieldName={'imageFile'}/>
        </Box>

        <Input
          id={'description'}
          label={'Description'}
          fieldName={'description'}
          form={formik}
          multiline
          maxRows={10}
          styles={STYLES.descriptionInput}/>

        <Box sx={STYLES.formButtons}>
          <Button
            variant='outlined'
            sx={STYLES.cancelButton}
            onClick={navigateToBooksPage}>
            Cancel
          </Button>

          <Button
            variant='contained'
            type='submit'
            disabled={formik.isSubmitting || (formik.touched && !formik.isValid)}>
            Save
          </Button>
        </Box>

      </form>
    </Box>

  </Card>
}