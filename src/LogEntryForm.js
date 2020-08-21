import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from './api';

const LogEntryForm = ({ location, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      //console.log(data);
      const created = await createLogEntry(data);
      console.log(created);
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }

    //console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error ? <h3 className="error">{error}</h3> : null}
      <label htmlfor="apiKey">API KEY</label>
      <input type="password" name="apiKey" requried ref={register} />
      <label htmlFor="title">Title</label>
      <input name="title" requried ref={register} />
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" rows={3} ref={register}></textarea>
      <label htmlFor="image">Image</label>
      <input name="image" ref={register} />
      <label htmlFor="visitedOn">VisitedDate</label>
      <input name="visitedOn" type="date" ref={register} />
      <button disabled={loading}>
        {' '}
        {loading ? 'Loading...' : 'Create Entry'}{' '}
      </button>
    </form>
  );
};

export default LogEntryForm;
