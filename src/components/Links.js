import React, { useEffect, useState } from 'react';
import LinkForm from './LinkForm';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const getLinks = async () => {
    db.collection('links').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  const onDeleteLink = async (id) => {
    if (window.confirm('Estas seguro de borrar el enlace')) {
      await db.collection('links').doc(id).delete();
      toast('Link eliminado', {
        type: 'error',
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === '') {
        await db.collection('links').doc().set(linkObject);
        toast('Nuevo link agregado', {
          type: 'success',
        });
      } else {
        db.collection('links').doc(currentId).update(linkObject);
        toast('Enlace Editado', {
          type: 'info',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="col">
      <div className="col-lg-12 p-2">
        <LinkForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="col-lg-12 p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons text"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                Go to Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
