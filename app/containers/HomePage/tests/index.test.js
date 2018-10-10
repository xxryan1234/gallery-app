import React from 'react';
import { shallow } from 'enzyme';
import { Spin } from 'antd';
import { HomePage } from '../index';

const stubPhotos = [
  {
    id: '6bwT4cI_UJs',
    urls: {
      raw:
        'https://images.unsplash.com/photo-1539088520072-12781bdc97b9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjM1MDUwfQ&s=6eec0da0c4b0f4fcecb4ed5eb1e2e15e',
      full:
        'https://images.unsplash.com/photo-1539088520072-12781bdc97b9?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM1MDUwfQ&s=e1d87c62b129cd7aa9364b8e813266dc',
      regular:
        'https://images.unsplash.com/photo-1539088520072-12781bdc97b9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ&s=4a831259b34fdd379f4df69432621785',
      small:
        'https://images.unsplash.com/photo-1539088520072-12781bdc97b9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ&s=96059f592b22e18e61d839974c8e1209',
      thumb:
        'https://images.unsplash.com/photo-1539088520072-12781bdc97b9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ&s=2b0cc4e8a83637848b5bfc45f0c1ea76',
    },
  },
  {
    id: 'pMImt780DDM',
    urls: {
      raw:
        'https://images.unsplash.com/photo-1539083943273-138a8ba5486d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjM1MDUwfQ&s=0ff294ede0b0c0fc4648a298f796ad4e',
      full:
        'https://images.unsplash.com/photo-1539083943273-138a8ba5486d?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjM1MDUwfQ&s=025fc43d250406bae608292c7a3fa2ca',
      regular:
        'https://images.unsplash.com/photo-1539083943273-138a8ba5486d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ&s=0a38088e9061ee2479d83d66accdbd78',
      small:
        'https://images.unsplash.com/photo-1539083943273-138a8ba5486d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ&s=99a9fe9e98413d1c8b857c64c4d7d8b9',
      thumb:
        'https://images.unsplash.com/photo-1539083943273-138a8ba5486d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjM1MDUwfQ&s=b6bb475c26fa8f9c138d5e99ae06ee10',
    },
  },
];

describe('<HomePage />', () => {
  let subject = null;
  let getPhotos;
  let photos;
  let loading;
  let totalPages;

  beforeEach(() => {
    getPhotos = jest.fn();
    photos = stubPhotos;
    loading = false;
    totalPages = 10;
  });

  const buildSubject = customProps => {
    const props = {
      getPhotos,
      photos,
      loading,
      totalPages,
    };
    return shallow(<HomePage {...Object.assign({}, props, customProps)} />);
  };

  it('renders a <HomePage> ', () => {
    subject = buildSubject();
    expect(subject.find(HomePage)).toBeDefined();
  });

  it('should render <Spin> when loading is true', () => {
    subject = buildSubject({ loading: true });
    expect(subject.find(Spin)).toBeDefined();
  });

  it('should render <EndSearchText /> span ', () => {
    subject = buildSubject();
    subject.setState({ page: 11 });
    expect(subject.find('.end-text')).toBeDefined();
  });

  it('should successfully call getPhotos api', () => {
    subject = buildSubject();
    subject.instance().loadMore();
    expect(getPhotos).toBeCalled();
  });

  it('should successfully changeFilter and call getPhotos', () => {
    const pageSize = 40;
    subject = buildSubject();
    subject.instance().changeFilter(pageSize, 'pageSize');
    expect(subject.state().pageSize).toEqual(pageSize);
    expect(getPhotos).toBeCalled();
  });
});
